use std::fs::write;

use ahqstore_types::{
  ahqstore::{AHQSTORE_APP_URL, AHQSTORE_APPS_DEV, AHQSTORE_DEV_DATA},
  api::{
    methods::get_commit,
    winget::{WINGET_APP_URL, WINGET_APPS_DEV, WINGET_DEV_DATA},
  },
  fdroid::{FDROID_APP_URL, FDROID_APPS_DEV, FDROID_DEV_DATA},
  get_home,
  linux::{LINUX_APP_URL, LINUX_APPS_DEV, LINUX_DEV_DATA},
  methods::OfficialManifestSource,
};
use paste::paste;
use serde_json::to_string_pretty;

macro_rules! rgen {
  ($x:ident) => {
    paste! {
      write(stringify!([<app_url_ $x>]), [<$x:upper _APP_URL>].replace("{COMMIT}", &$x)).ok()?;
      write(stringify!([<apps_dev_ $x>]), [<$x:upper _APPS_DEV>].replace("{COMMIT}", &$x)).ok()?;
      write(stringify!([<dev_data_ $x>]), [<$x:upper _DEV_DATA>].replace("{COMMIT}", &$x)).ok()?;
    }
  };
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
  
  write("./home_win32.json", to_string_pretty(&win32_home).ok()?).ok()?;
  write("./home_linux.json", to_string_pretty(&linux_home).ok()?).ok()?;
  write("./home_fdroid.json", to_string_pretty(&fdroid_home).ok()?).ok()?;

  rgen!(winget);
  rgen!(linux);
  rgen!(fdroid);
  rgen!(ahqstore);

  Some(())
}
