import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { AuthContextProvider } from "../context/auth.context";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthContextProvider>
        <SidebarProvider>
          {/* <Sidebar /> */}
          <main>
            {/* <SidebarTrigger /> */}
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </AuthContextProvider>
    </>
  );
};
