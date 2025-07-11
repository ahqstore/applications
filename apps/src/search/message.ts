export interface Load {
  type: "Load"
  entry: "windows" | "linux" | "fdroid";
}

export interface Search {
  type: "Search"
  content: string;
}

export type WorkerMessage = Load | Search;

export interface SearchOutput {
  type: "Successful"
  data: string[]
}