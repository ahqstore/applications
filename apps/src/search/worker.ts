import type { WorkerMessage } from "./message";
import MiniSearch from 'minisearch'

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
        .then((r) => r.json());

      miniSearch.addAll(dataset);

      console.log("Search data has been initialized");

      postMessage("updated");
    }
  }
}