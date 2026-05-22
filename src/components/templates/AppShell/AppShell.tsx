"use client";
import React from "react";
import clsx from "clsx";
import Topbar from "@/components/organisms/topbar/Topbar";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Footer from "@/components/organisms/footer/Footer";
import Workspace from "@/components/organisms/workspace/Workspace";
import TacticalGrid from "@/components/templates/TacticalGrid/TacticalGrid";
import useModuleTransition from "@/hooks/useModuleTransition";
import ScanlineOverlay from "@/components/effects/ScanlineOverlay/ScanlineOverlay";
import { useActiveModule } from "@/context/ActiveModuleContext";

export interface AppShellProps {
  children?: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, className }) => {
  useModuleTransition();
  const { activeModule } = useActiveModule();

  return (
    <div className={clsx("flex flex-col h-screen w-screen bg-bg-base relative overflow-hidden select-none font-mono", className)}>
      {/* CRT Scanline & flicker visual overlay */}
      <ScanlineOverlay key={activeModule} />

      {/* Reusable tactical background sub-pixel grid */}
      <TacticalGrid />

      {/* 1. Top operational header */}
      <Topbar />

      {/* 2. Middle console view (Sidebar + Workspace Main viewport) */}
      <div className="flex flex-row flex-grow min-h-0 relative z-10">
        {/* Navigation Sidebar */}
        <Sidebar />
        
        {/* Main core content area */}
        <main className="flex-grow flex flex-col min-w-0 relative h-full">
          {children || <Workspace />}
        </main>
      </div>

      {/* 3. Technical footer bar */}
      <Footer />
    </div>
  );
};

export default AppShell;
