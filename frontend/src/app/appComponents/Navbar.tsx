"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import appLogo from "../../../public/logos/appLogo.png";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Problems",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Submissions",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function Navbar() {
  const { handleSignOut, isAuth, userDetails, isLoading, initailizeAuth } =
    useAuth();

  console.log(isAuth, userDetails, isLoading);
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isAuth == undefined || isAuth == null) {
    return <>not Authenticated...</>;
  }

  if (!userDetails) {
    return <>Loading user...</>;
  }

  useEffect(() => {
    initailizeAuth();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            <Image
              src={appLogo}
              className="h-16 w-24"
              alt="Application Logo"
            ></Image>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mb-12">
        <Button variant={"secondary"} onClick={() => handleSignOut()}>
          {userDetails?.firstName}'s Profile
        </Button>
        <Button onClick={() => handleSignOut()}>Sign Out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
