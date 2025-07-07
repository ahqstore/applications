import { SearchHost } from "@/search/search";
import { useEffect, useState } from "react";
//import { Input } from "../ui/input";

export interface SearchBoxProps {
  pageType: "windows" | "linux" | "fdroid"
}

export function SearchBox(props: SearchBoxProps) {
  const [data, setData] = useState<SearchHost | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const search = new SearchHost();

      await search.load(props.pageType);

      setData(search);
    })();
  }, []);

  if (!data) {
    return <span>Loading</span>;
  }

  return <>Search Box Loaded</>;
}