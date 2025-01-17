"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { FaLaptop } from "react-icons/fa6";
import { BsMicrosoft } from "react-icons/bs";
import { FcLinux, FcAndroidOs } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";

import type { IconType } from "react-icons"

import { cn } from "@/lib/utils"
import type { System } from "@/hooks/use-os"

type Status = {
  label: string
  icon: React.ForwardRefExoticComponent<any> | IconType
}

const statuses: { [key in System]: Status } = {
  "windows": {
    label: "Windows",
    icon: BsMicrosoft,
  },
  "linux": {
    label: "Linux",
    icon: FcLinux,
  },
  "android": {
    label: "Android",
    icon: FcAndroidOs,
  },
  "unsupported": {
    label: "Unsupported",
    icon: MdErrorOutline,
  }
}

export function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectedStatus = statuses["unsupported"];

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>
                <FaLaptop className="mr-2 h-4 w-4 shrink-0" />
                OS
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} selectedStatus={selectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? (
            <>
              <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
              {selectedStatus.label}
            </>
          ) : (
            <>
              <FaLaptop className="mr-2 h-4 w-4 shrink-0" />
              OS
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} selectedStatus={selectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  selectedStatus,
}: {
  setOpen: (open: boolean) => void
  selectedStatus: Status | undefined
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Object.entries(statuses).filter(([value,]) => value != "unsupported").map(([value, status]) => (
            <CommandItem
              key={value}
              value={value}
              onSelect={(value) => {
                window.location.pathname = `/applications/${value}`
                setOpen(false);
              }}
            >
              {status && <status.icon
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedStatus?.label === status?.label
                    ? "opacity-100"
                    : "opacity-40"
                )}
              />}
              <span>{status?.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
