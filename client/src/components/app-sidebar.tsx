import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  PenSquare,
  CalendarDays,
  BarChart3,
  ImageIcon,
  FileText,
  Hash,
  Settings,
  LogOut,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Compose", url: "/compose", icon: PenSquare },
  { title: "Scheduler", url: "/scheduler", icon: CalendarDays },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const toolItems = [
  { title: "Media Library", url: "/media", icon: ImageIcon },
  { title: "Templates", url: "/templates", icon: FileText },
  { title: "Hashtags", url: "/hashtags", icon: Hash },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--sidebar-primary))]">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">LinPost Pro</h1>
            <p className="text-[10px] text-sidebar-foreground/50 font-medium">LinkedIn Automation</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest font-semibold">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase()}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span className="text-[13px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest font-semibold">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span className="text-[13px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-2">
        <SidebarSeparator />
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-[13px] text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="text-[10px] bg-[hsl(var(--sidebar-primary))] text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-sidebar-foreground truncate">{user?.displayName || user?.username}</p>
            <div className="flex items-center gap-1">
              <FaLinkedin className="w-2.5 h-2.5 text-[hsl(var(--sidebar-primary))]" />
              <p className="text-[10px] text-sidebar-foreground/50">
                {user?.linkedinConnected ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1 rounded text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors"
            data-testid="button-logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
