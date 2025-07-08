import type { AHQStoreApplication, DevData } from "ahqstore-types";

export enum Type {
  App,
  User
}

export interface App {
  type: Type.App;
  data: AHQStoreApplication;
}

export interface Dev {
  type: Type.User;
  data: DevData;
}

export type CacheValue = App;

const TEN_MINUES_IN_MS = 10 * 60 * 1000;

export class Cache {
  data: { [key: string]: { data: CacheValue; expires: number } } = {};

  constructor() {
    setInterval(() => {
      const now = Date.now();

      Object.entries(this.data)
        .forEach(([key, val]) => {
          if (now > val.expires) {
            delete this.data[key];
          }
        });
    }, TEN_MINUES_IN_MS);
  }
}

export const cache = new Cache();

