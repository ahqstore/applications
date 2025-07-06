"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { ComboBoxResponsive } from "@/components/combobox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MdSearch } from "react-icons/md"
import { useOperatingSystem } from "@/hooks/use-os"

export default function Nav() {
  useOperatingSystem();

  return (
    <NavigationMenu className="max-h-16" style={{ maxHeight: "4rem" }}>
      <NavigationMenuList className="w-screen max-w-screen min-w-screen p-1 flex md:p-2">
        <NavigationMenuItem className="hidden sm:block">
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle({ className: "cursor-pointer flex gap-1 border-border border md:border-none" })}>
            <img src="/applications/icon.png" className="w-6 h-6 hidden sm:block" />
            <span className="hidden md:block">AHQ Store</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-full flex">
          <Input
            placeholder="Search..."
            className="md:w-[20rem] lg:w-[40rem] rounded-r-none"
          />
          <Button variant={"outline"} className="rounded-l-none">
            <MdSearch size={"1.5em"} />
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <ComboBoxResponsive />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
