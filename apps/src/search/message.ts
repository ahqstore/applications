export interface Load {
  type: "Load"
  entry: string;
}

export type WorkerMessage = Load;