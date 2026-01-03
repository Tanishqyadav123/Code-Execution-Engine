"use client";

import {
  Calendar,
  Home,
  Inbox,
  LucideProps,
  Search,
  Settings,
  Bug,
} from "lucide-react";

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
import React, { useEffect } from "react";
import { RoleType } from "../entity/role.enum";
let itemsForSolver: {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Problems",
    url: "/problems",
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

let itemsForProblemSetter: {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Problems",
    url: "/problems",
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
              {userDetails.RoleDetails.roleName === RoleType.PROBLEM_SETTER
                ? itemsForProblemSetter.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : itemsForSolver.map((item) => (
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
