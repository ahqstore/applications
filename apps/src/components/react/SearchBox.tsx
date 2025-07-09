import { SearchHost } from "@/search/search";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Search } from "lucide-react";
import { searchStore } from "@/search/searchStore";

export interface SearchBoxProps {
  children: React.ReactNode;
  pageType: "windows" | "linux" | "fdroid" | "none"
}

// Component to render the common search bar structure
interface CommonSearchElementsProps {
  children: React.ReactNode;
  pageType: "windows" | "linux" | "fdroid";
  isLoading: boolean;
  waste?: boolean;
}

function CommonSearchElements({ children, pageType, isLoading, waste }: CommonSearchElementsProps) {
  const search = useRef<HTMLInputElement | null>(null);

  const pushState = (uri: URL) => history.pushState(null, "AHQ Store", uri);

  const [initialSearch, setInitialSearch] = useState(undefined as string | undefined);

  useEffect(() => {
    const url = new URL(window.location.href);

    const output = url.searchParams.get("search");

    if (output && output.length > 0) {
      setInitialSearch(output);
      searchStore.set(output);
    }
  }, []);

  useEffect(() => {
    const listener = () => {
      const url = new URL(window.location.href);
      const output = url.searchParams.get("search") ?? "";

      if (output.length == 0) {
        if (search.current) {
          search.current.value = "";
        }
        searchStore.set(undefined);


        return;
      }

      // Change this
      setInitialSearch(output);

      if (search.current) {
        // Forcefully update ofc
        search.current.value = output;
      }


      searchStore.set(output);
    };

    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);


  return (
    <div className="flex mt-3 w-screen md:px-3">
      {/* Nav for children */}
      <nav className={`h-full justify-center items-center my-auto ${waste ? "flex mx-auto md:mx-0" : "hidden md:flex"}`}>
        {children}
      </nav>

      {/* Search Input/Form */}
      {isLoading ? (
        <div className="relative px-4 md:px-0 w-[98vw] max-w-[32rem] mx-auto" hidden={waste}>
          <input
            type="text"
            placeholder={"Loading index..."}
            className={"w-full py-3 pl-9 pr-3 bg-primary/10 rounded-xl border border-border focus:outline-none focus:ring-1 focus:ring-muted transition duration-300"}
            hidden={waste}
            disabled
          />
          <Search className={waste ? "hidden" : "absolute left-[calc(calc(var(--spacing)*2.5)+calc(var(--spacing)*4))] md:left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5"} />
        </div>
      ) : (
        <form
          className="relative px-4 md:px-0 w-[98vw] max-w-[32rem] mx-auto"
          onSubmit={(e) => {
            e.preventDefault();

            const value = search.current!!.value;

            const url = new URL(window.location.href);

            if (value.trim().length > 0) {
              url.searchParams.set("search", value);
              searchStore.set(value);
            } else {
              url.searchParams.delete("search");
              searchStore.set(undefined);
            }

            pushState(url);
          }}
        >
          <input
            type="text"
            placeholder="Search for apps, games, and more"
            className="w-full py-3 pl-9 pr-3 bg-primary/10 rounded-xl border border-border focus:outline-none focus:ring-1 focus:ring-muted transition duration-300"
            minLength={3}
            maxLength={64}
            ref={search}
            onChange={(e) => {
              if (e.target.value.trim() == "") {
                const url = new URL(window.location.href);

                url.searchParams.delete("search");
                searchStore.set(undefined);

                pushState(url);
              }
            }}
            defaultValue={initialSearch}
          />
          <Search className="absolute left-[calc(calc(var(--spacing)*2.5)+calc(var(--spacing)*4))] md:left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </form>
      )}

      {/* Select Component */}
      <Select value={pageType} onValueChange={(val) => window.location.href = `/applications/${val != "fdroid" ? val : "android"}`}>
        <SelectTrigger aria-label={`You are currently viewing ${pageType} applist`} className={`${waste ? "ml-auto" : ""} hidden md:flex w-[7rem] h-5`}> {/* Use h-5 consistently */}
          <SelectValue placeholder="Site" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem aria-label="Set your viewing os to Windows" value="windows">Windows</SelectItem>
          <SelectItem aria-label="Set your viewing os to Linux" value="linux">Linux</SelectItem>
          <SelectItem aria-label="Set your viewing os to Android" value="fdroid">Android</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SearchBox(props: SearchBoxProps) {
  const [data, setData] = useState<SearchHost | undefined>(undefined);
  const isLoading = data === undefined; // Derive isLoading state

  useEffect(() => {
    if (props.pageType != "none") {
      (async () => {
        const search = new SearchHost();
        await search.load(props.pageType);
        setData(search);
      })();
    }
  }, [props.pageType]);

  if (props.pageType == "none") {
    return <CommonSearchElements
      children={props.children}
      pageType="windows"
      isLoading={isLoading}
      waste
    />;
  }

  return (
    <CommonSearchElements
      children={props.children}
      pageType={props.pageType}
      isLoading={isLoading}
    />
  );
}