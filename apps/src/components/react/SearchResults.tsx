import type { SearchHost } from "@/search/search";
import { searching, searchStore } from "@/search/searchStore";
import { useEffect, useRef, useState } from "react";

export interface SearchResProps {
  className?: string;
}

export function SearchResults(props: SearchResProps) {
  const worker = useRef<SearchHost | null>(null);

  const [items, setItems] = useState<string[] | null>(null);

  useEffect(() => {
    console.log("I have loaded");
    (async () => {
      worker.current = (await import("@/search/search")).searchWorker;

      searchStore.subscribe(async (search) => {
        console.log("now search content is:", search);
        searching.set(true);

        if (search && search.length > 3) {
          await worker.current!!.search(search!!);
        }

        searching.set(false);
      });
    })()
  }, []);

  return <div className={props.className}>
    {items ?
      items.map((item, index) => <h1 key={index}>{item}</h1>)
      : "Nothing!"}
  </div>;
}