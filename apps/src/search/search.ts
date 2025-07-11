import type { Load, Search, SearchOutput } from "./message";

export class SearchHost {
  worker: Worker;

  constructor() {
    const search = new Worker(new URL("worker.ts", import.meta.url), { type: "module" });

    this.worker = search;
  }

  async load(entry: string) {
    this.worker.postMessage({
      type: "Load",
      entry
    } as Load);

    return new Promise((resolve) => {
      const handle = ({ data }: any) => {
        if (data == "updated") {
          resolve(undefined);
          this.worker.removeEventListener("message", handle);
        }
      };

      this.worker.addEventListener("message", handle);
    });
  }

  async search(text: string) {
    this.worker.postMessage({
      type: "Search",
      content: text
    } as Search);

    return new Promise((resolve) => {
      const handle = (res: MessageEvent<SearchOutput>) => {
        if (res.data.type == "Successful") {
          resolve(res.data.data);
          this.worker.removeEventListener("message", handle);
        }
      };

      this.worker.addEventListener("message", handle);
    });
  }
}

export const searchWorker = new SearchHost();