import type { Load } from "./message";

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
}

export const searchWorker = new SearchHost();