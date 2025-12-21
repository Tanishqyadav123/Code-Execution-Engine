"use client";

import { Navbar } from "./appComponents/Navbar";
import { Card } from "@/components/ui/card";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {}, []);
  return (
    <div className="flex h-screen w-[80vw] ">
      {/* Sidebar */}
      {/* <aside className="w-64"> */}
      <Navbar />
      {/* </aside> */}

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's an overview of your application.
          </p>
        </header>

        {/* Quick Actions / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-4 flex items-center space-x-4">
            <Home className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="font-semibold">Home</h2>
              <p className="text-gray-500 text-sm">Main dashboard overview.</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-4">
            <Inbox className="w-6 h-6 text-green-500" />
            <div>
              <h2 className="font-semibold">Inbox</h2>
              <p className="text-gray-500 text-sm">Check your messages.</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-yellow-500" />
            <div>
              <h2 className="font-semibold">Calendar</h2>
              <p className="text-gray-500 text-sm">View upcoming events.</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-4">
            <Search className="w-6 h-6 text-purple-500" />
            <div>
              <h2 className="font-semibold">Search</h2>
              <p className="text-gray-500 text-sm">Find content easily.</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center space-x-4">
            <Settings className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="font-semibold">Settings</h2>
              <p className="text-gray-500 text-sm">Manage preferences.</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
