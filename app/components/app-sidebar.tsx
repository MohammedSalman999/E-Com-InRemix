import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
// import { NavProjects } from "~/components/nav-projects"
// import { NavUser } from "~/components/nav-user"
// import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";



export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar> & { children?: React.ReactNode }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent className="bg-[#05032B] text-white">
        {children}
      </SidebarContent>
      {/* <SidebarFooter><NavUser user={data.user} /></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
