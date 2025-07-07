import type { WorkerMessage } from "./message";
import MiniSearch from 'minisearch'

import { decode } from "@msgpack/msgpack"

console.log("Hello from worker");

let miniSearch = new MiniSearch({
  fields: ['title', 'name', "id"], // fields to index for full-text search
  storeFields: ['id'], // fields to return with search results
  searchOptions: {
    boost: { title: 2 },
    fuzzy: 0.8,
  },
});

onmessage = async (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type == "Load") {
    if (e.data.entry == "windows") {
      const dataset = await fetch("/applications/jsondump/search_data_winget_json")
        .then((r) => r.arrayBuffer());

      const data = new Uint8Array(dataset);
      const database = decode(data) as [string, string, string][];

      const toData = database.map((s) => ({ name: s[0], title: s[1], id: s[2] }));

      miniSearch.addAll(toData);

      console.log("Search data has been initialized");

      postMessage("updated");
    }
  }
}