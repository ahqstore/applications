use std::fs::{create_dir, write as fswrite};

use ahqstore_types::{
  ahqstore::{AHQSTORE_APPS_DEV, AHQSTORE_APP_URL, AHQSTORE_DEV_DATA, AHQSTORE_SEARCH, AHQSTORE_TOTAL, AHQSTORE_MAP},
  api::{
    methods::{get_commit, get_full_search, get_full_map},
    winget::{WINGET_APPS_DEV, WINGET_APP_URL, WINGET_DEV_DATA, WINGET_SEARCH, WINGET_TOTAL, WINGET_MAP},
  },
  fdroid::{FDROID_APPS_DEV, FDROID_APP_URL, FDROID_DEV_DATA, FDROID_SEARCH, FDROID_TOTAL, FDROID_MAP},
  get_home,
  linux::{LINUX_APPS_DEV, LINUX_APP_URL, LINUX_DEV_DATA, LINUX_SEARCH, LINUX_TOTAL, LINUX_MAP},
  methods::OfficialManifestSource, SearchEntry,
};
use paste::paste;
use serde::{Deserialize, Serialize};
use serde_json::to_string as to_string_pretty;

fn write<C: AsRef<[u8]>>(path: &str, contents: C) -> std::io::Result<()> {
  fswrite(format!("../apps/jsondump/{path}"), contents)
}

macro_rules! rgen {
  ($x:ident, $s:ident, $commit:ident $(, $xa:expr)?) => {
    paste! {
      write(stringify!([<app_url_ $x>]), [<$x:upper _APP_URL>].replace("{COMMIT}", &$x)).ok()?;
      write(stringify!([<apps_dev_ $x>]), [<$x:upper _APPS_DEV>].replace("{COMMIT}", &$x)).ok()?;
      write(stringify!([<dev_data_ $x>]), [<$x:upper _DEV_DATA>].replace("{COMMIT}", &$x)).ok()?;

      {
        println!("Generating map for {}", stringify!($x));

        let total_url: &str = &[<$x:upper _TOTAL>];
        let map_url: &str = &[<$x:upper _MAP>];
        
        #[cfg(debug_assertions)]
        println!("Urls: {total_url} {map_url} {}", &$commit);

        let map = get_full_map(total_url, map_url, &$commit)
          .await?;
        
        write(
          stringify!([<map_data_ $x _json>]),
          to_string_pretty(&map).ok()?
        ).ok()?;

        println!("Generated map for {}", stringify!($x));
      }

      $(
        {
          println!("Generating search data for {}", stringify!($x));
          let _ = $xa;
          let mut search = $s.clone();

          let total_url: &str = &[<$x:upper _TOTAL>];
          let search_url: &str = &[<$x:upper _SEARCH>];

          #[cfg(debug_assertions)]
          println!("Urls: {total_url} {search_url} {}", &$commit);

          let result: Vec<SearchEntry> = get_full_search(total_url, search_url, &$commit)
            .await?;

          let result: Vec<_> = result.into_iter().map(|x| ClonableSearchEntry {
              id: x.id,
              name: x.name,
              title: x.title
            })
            .collect::<Vec<_>>();

          #[cfg(debug_assertions)]
          println!("Outputs (len): {}", result.len());

          search.extend(result);

          write(
            stringify!([<search_data_ $x _json>]),
            to_string_pretty(&search).ok()?
          ).ok()?;

          println!("Generated search data for {}", stringify!($x));
        }
      )?
    }
  };
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClonableSearchEntry {
  pub name: String,
  pub title: String,
  pub id: String,
}

#[tokio::main]
async fn main() {
  run().await.unwrap();
}

async fn run() -> Option<()> {
  let token = option_env!("TOKEN").and_then(|x| Some(x.to_string()));
  let token = token.as_ref();

  let ahqstore = get_commit(OfficialManifestSource::AHQStore, token).await?;

  let winget = get_commit(OfficialManifestSource::WinGet, token).await?;
  let fdroid = get_commit(OfficialManifestSource::FDroid, token).await?;
  let linux = get_commit(OfficialManifestSource::Linux, token).await?;

  let win32_home = get_home(OfficialManifestSource::WinGet, &winget)
    .await
    .ok()?;

  let linux_home = get_home(OfficialManifestSource::Linux, &linux)
    .await
    .ok()?;

  let fdroid_home = get_home(OfficialManifestSource::FDroid, &fdroid)
    .await
    .ok()?;

  _ = create_dir("../apps/jsondump");
  
  write("commit_ahqstore", &ahqstore).ok()?;
  write("commit_win32", &winget).ok()?;
  write("commit_fdroid", &fdroid).ok()?;
  write("commit_linux", &linux).ok()?;

  write("home_win32.json", to_string_pretty(&win32_home).ok()?).ok()?;
  write("home_linux.json", to_string_pretty(&linux_home).ok()?).ok()?;
  write("home_fdroid.json", to_string_pretty(&fdroid_home).ok()?).ok()?;

  let ahqstore_total: &str = &AHQSTORE_TOTAL;
  let ahqstore_search: &str = &AHQSTORE_SEARCH;

  let search_result: Vec<SearchEntry> = get_full_search(ahqstore_total, ahqstore_search, &ahqstore)
    .await?;

  let search_result = search_result.into_iter()
    .map(|x| ClonableSearchEntry {
      id: x.id,
      name: x.name,
      title: x.title
    })
    .collect::<Vec<_>>();

  rgen!(winget, search_result, winget, true);
  rgen!(linux, search_result, linux, true);
  rgen!(fdroid, search_result, fdroid, true);
  rgen!(ahqstore, search_result, ahqstore);

  Some(())
}
