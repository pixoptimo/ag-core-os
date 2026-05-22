"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import StatusIndicator from "../../atoms/indicators/StatusIndicator";
import TelemetryLabel from "../../atoms/labels/TelemetryLabel";
import * as Icons from "lucide-react";

export interface TopbarProps {
  className?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ className }) => {
  const [timeStr, setTimeStr] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={clsx(
        "h-8 w-full border-b border-border-tactical/60 bg-bg-base/75 backdrop-blur-md flex items-center justify-between px-3 z-40 relative select-none",
        className
      )}
    >
      {/* Absolute overlay elements for glassmorphism panels */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-blue/5 pointer-events-none" />

      {/* Brand Section */}
      <div className="flex items-center space-x-3 z-10">
        <div className="flex items-center space-x-1.5">
          <span className="font-mono text-[10.5px] font-black tracking-[0.25em] text-neon-blue uppercase neon-glow-blue">
            AG-CORE OS
          </span>
          <span className="text-[8px] text-border-tactical font-mono tracking-widest font-bold">
            |
          </span>
          <div className="flex items-center space-x-1">
            <span className="font-mono text-[8.5px] tracking-[0.2em] font-bold text-neon-blue/50">
              NODE:
            </span>
            <span className="font-mono text-[8.5px] tracking-[0.2em] font-extrabold text-neon-blue">
              042
            </span>
          </div>
          <span className="text-[8px] text-border-tactical font-mono tracking-widest font-bold">
            |
          </span>
          <div className="flex items-center space-x-1.5">
            <StatusIndicator color="green" size="sm" pulse />
            <span className="font-mono text-[8.5px] tracking-[0.22em] font-extrabold text-neon-green neon-glow-green">
              S-SYNC:ON
            </span>
          </div>
        </div>
      </div>

      {/* Telemetry HUD & Time Section */}
      <div className="flex items-center space-x-3 z-10">
        {/* Real-time System Clock */}
        <div className="flex items-center space-x-1.5 bg-surface-dim/40 border border-border-tactical/40 px-2 py-0.5">
          <Icons.Clock size={10} className="text-neon-blue/60" />
          <span className="font-mono text-[9.5px] font-bold tracking-[0.15em] text-neon-blue/95">
            {timeStr}
          </span>
        </div>

        {/* Sync & Connectivity HUD */}
        <div className="flex items-center space-x-2.5 text-neon-blue/60">
          <button className="hover:text-neon-blue hover:neon-glow-blue transition-colors cursor-pointer" title="Network Grid">
            <Icons.CloudLightning size={12} />
          </button>
          <button className="hover:text-neon-blue hover:neon-glow-blue transition-colors cursor-pointer" title="Radar telemetry">
            <Icons.Radio size={12} />
          </button>
          <button className="hover:text-neon-blue hover:neon-glow-blue transition-colors cursor-pointer" title="System Settings">
            <Icons.Sliders size={12} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
