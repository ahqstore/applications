import { SearchHost } from "@/search/search";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Search } from "lucide-react";

export interface SearchBoxProps {
  children: React.ReactNode;
  pageType: "windows" | "linux" | "fdroid"
}

// Component to render the common search bar structure
interface CommonSearchElementsProps {
  children: React.ReactNode;
  pageType: "windows" | "linux" | "fdroid";
  isLoading: boolean;
}

function CommonSearchElements({ children, pageType, isLoading }: CommonSearchElementsProps) {
  return (
    <div className="flex mt-3 w-screen md:px-3">
      {/* Nav for children */}
      <nav className={`h-full justify-center items-center my-auto ${isLoading ? 'flex' : 'hidden md:flex'}`}>
        {children}
      </nav>

      {/* Search Input/Form */}
      {isLoading ? (
        <div className="relative px-4 md:px-0 w-[98vw] max-w-[32rem] mx-auto">
          <input
            type="text"
            placeholder="Loading index..."
            className="w-full py-3 pl-9 pr-3 bg-primary/10 rounded-xl border border-border focus:outline-none focus:ring-1 focus:ring-muted transition duration-300"
            disabled
          />
          <Search className="absolute left-[calc(calc(var(--spacing)*2.5)+calc(var(--spacing)*4))] md:left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
      ) : (
        <form className="relative px-4 md:px-0 w-[98vw] max-w-[32rem] mx-auto">
          <input
            type="text"
            placeholder="Search for apps, games, and more"
            className="w-full py-3 pl-9 pr-3 bg-primary/10 rounded-xl border border-border focus:outline-none focus:ring-1 focus:ring-muted transition duration-300"
            minLength={3}
            maxLength={64}
          />
          <Search className="absolute left-[calc(calc(var(--spacing)*2.5)+calc(var(--spacing)*4))] md:left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </form>
      )}

      {/* Select Component */}
      <Select value={pageType} onValueChange={(val) => window.location.pathname = `/applications/${val != "fdroid" ? val : "android"}`}>
        <SelectTrigger className="hidden md:flex w-[7rem] h-5"> {/* Use h-5 consistently */}
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="windows">Windows</SelectItem>
          <SelectItem value="linux">Linux</SelectItem>
          <SelectItem value="fdroid">Android</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SearchBox(props: SearchBoxProps) {
  const [data, setData] = useState<SearchHost | undefined>(undefined);
  const isLoading = data === undefined; // Derive isLoading state

  useEffect(() => {
    (async () => {
      const search = new SearchHost();
      await search.load(props.pageType);
      setData(search);
    })();
  }, [props.pageType]);

  return (
    <CommonSearchElements
      children={props.children}
      pageType={props.pageType}
      isLoading={isLoading}
    />
  );
}