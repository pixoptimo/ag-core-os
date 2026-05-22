import React from "react";
import clsx from "clsx";
import Topbar from "../../organisms/topbar/Topbar";
import Sidebar from "../../organisms/sidebar/Sidebar";
import Footer from "../../organisms/footer/Footer";
import Workspace from "../../organisms/workspace/Workspace";
import TacticalGrid from "../TacticalGrid/TacticalGrid";
import ScanlineOverlay from "../../effects/ScanlineOverlay/ScanlineOverlay";

export interface AppShellProps {
  children?: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, className }) => {
  return (
    <div className={clsx("flex flex-col h-screen w-screen bg-bg-base relative overflow-hidden select-none font-mono", className)}>
      {/* CRT Scanline & flicker visual overlay */}
      <ScanlineOverlay />

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
