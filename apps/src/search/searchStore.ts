import { atom } from "nanostores"

export const searchStore = atom(undefined as string | undefined);
export const searching = atom(false);
