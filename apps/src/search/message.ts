export interface Load {
  type: "Load"
  entry: "windows" | "linux" | "fdroid";
}

export type WorkerMessage = Load;