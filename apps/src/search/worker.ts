import type { SearchOutput, WorkerMessage } from "./message";
import MiniSearch from 'minisearch'

import { decode } from "@msgpack/msgpack"

console.log("Hello from worker");

let miniSearch = new MiniSearch({
  fields: ['title', 'name', "id"], // fields to index for full-text search
  storeFields: ['id'], // fields to return with search results
  searchOptions: {
    // boost: { name: 2, title: 2 },
    fuzzy: 0.8,
  },
});

onmessage = async (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type == "Load") {
    const datasetName = (() => {
      switch (e.data.entry) {
        case "windows":
          return "search_data_winget_json";
        case "fdroid":
          return "search_data_fdroid_json";
        case "linux":
          return "search_data_linux_json";
      }
    })();

    const dataset = await fetch(`/applications/jsondump/${datasetName}`)
      .then((r) => r.arrayBuffer());

    const data = new Uint8Array(dataset);
    const database = decode(data) as [string, string, string][];

    const toData = database.map((s) => ({ name: s[0], title: s[1], id: s[2] }));

    miniSearch.addAll(toData);

    console.log("Search data has been initialized");

    postMessage("updated");
  } else if (e.data.type == "Search") {
    const content = e.data.content;

    const data = miniSearch.search(content)
      .map((s) => s.id);

    if (data.length > 1000) data.length = 1000;

    postMessage({
      type: "Successful",
      data
    } as SearchOutput);
  }
}