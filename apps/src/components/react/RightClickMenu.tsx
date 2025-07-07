import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import type React from "react";

interface RightClickMenuprops {
  children: React.ReactNode[]
}

export function RightClickMenu(props: RightClickMenuprops) {
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