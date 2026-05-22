"use client";

import React, { useState } from "react";
import clsx from "clsx";
import NavItem from "@/components/molecules/NavItem/NavItem";
import TelemetryLabel from "@/components/atoms/labels/TelemetryLabel";
import { useActiveModule } from "@/context/ActiveModuleContext";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";

export interface SidebarProps {
  className?: string;
  onModuleChange?: (module: string) => void;
}

interface ModuleItem {
  name: string;
  icon: "LayoutGrid" | "GitFork" | "Archive" | "Sliders" | "Activity" | "Shield" | "Radio" | "Clock" | "Brain";
}

const MODULES: ModuleItem[] = [
  { name: "NEXUS", icon: "LayoutGrid" },
  { name: "STITCH", icon: "GitFork" },
  { name: "ARCHIVE", icon: "Archive" },
  { name: "CONFIG", icon: "Sliders" },
  { name: "PULSE", icon: "Activity" },
  { name: "SENTINEL", icon: "Shield" },
  { name: "RELAY", icon: "Radio" },
  { name: "CHRONOS", icon: "Clock" },
  { name: "SYNAPSE", icon: "Brain" },
];

export const Sidebar: React.FC<SidebarProps> = ({ className, onModuleChange }) => {
  const { activeModule, setActiveModule } = useActiveModule();
  const router = useRouter();

  const handleModuleClick = (name: string) => {
    setActiveModule(name);
    // NEXUS is the home page; all others go to /<module>
    router.push(name === 'NEXUS' ? '/' : `/${name.toLowerCase()}`);
    if (onModuleChange) {
      onModuleChange(name);
    }
  };

  return (
    <aside
      className={clsx(
        "w-44 h-full border-r border-border-tactical/60 bg-bg-base flex flex-col justify-between select-none shrink-0 z-30 relative",
        className
      )}
    >
      {/* Sidebar Top Branding Header */}
      <div className="p-3 border-b border-border-tactical/40">
        <h2 className="font-mono text-[11.5px] font-extrabold tracking-[0.22em] text-neon-blue uppercase neon-glow-blue">
          AG-CORE
        </h2>
        <div className="flex items-center space-x-1 mt-0.5">
          <span className="font-mono text-[8px] tracking-[0.2em] text-border-tactical uppercase font-bold">
            KERNEL V4.2.0
          </span>
        </div>
      </div>

      {/* Main Module Nav List */}
      <div className="flex-grow py-1.5 overflow-y-auto overflow-x-hidden">
        <div className="space-y-0">
          {MODULES.map((mod) => (
            <NavItem
              key={mod.name}
              label={mod.name}
              iconName={mod.icon}
              active={activeModule === mod.name}
              onClick={() => handleModuleClick(mod.name)}
            />
          ))}
        </div>
      </div>

      {/* Profile / Admin block at the bottom */}
      <div className="p-2 border-t border-border-tactical/40 bg-surface-dim/20">
        <div className="flex items-center space-x-2">
          {/* Futuristic Cybernetic Avatar */}
          <div className="relative w-7 h-7 border border-neon-blue/40 flex items-center justify-center bg-surface-mid/30 select-none overflow-hidden shrink-0 group">
            {/* Scanline element on avatar */}
            <span className="absolute inset-0 bg-gradient-to-b from-neon-blue/20 to-transparent animate-pulse-slow pointer-events-none" />
            <Icons.User size={13} className="text-neon-blue/70 group-hover:text-neon-blue transition-colors duration-200" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-neon-green border border-bg-base rounded-full" />
          </div>

          {/* Admin Info */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-mono text-[9.5px] font-black tracking-[0.18em] text-neon-blue truncate uppercase">
              SYS_ADMIN
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-neon-green/80 uppercase font-semibold mt-0.5">
              AUTH_LVL: 09
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
