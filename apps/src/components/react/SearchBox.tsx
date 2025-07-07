import { useState } from "react";
//import { Input } from "../ui/input";

export function SearchBox() {
  const [data, setData] = useState(undefined);

  if (!data) {
    return <span>This is the search box</span>;
  }

  return <></>;
}