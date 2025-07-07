import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import type React from "react";

interface ScrollBarProps {
  children: React.ReactNode[]
}

export function ScrollBar(props: ScrollBarProps) {
  return <ContextMenu>
    <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>;
}