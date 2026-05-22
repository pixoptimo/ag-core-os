"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import StatusIndicator from "../../atoms/indicators/StatusIndicator";

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const [latency, setLatency] = useState<number>(12);
  const [memory, setMemory] = useState<number>(2.43);

  // Fluctuating stats simulation for cinematic realism
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const diff = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + diff;
        return next > 6 ? (next < 25 ? next : 12) : 9;
      });
      setMemory((prev) => {
        const diff = (Math.random() * 0.04) - 0.02; // -0.02GB to +0.02GB
        const next = Number((prev + diff).toFixed(2));
        return next > 2.1 ? (next < 2.8 ? next : 2.43) : 2.3;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className={clsx(
        "h-6 w-full border-t border-border-tactical/60 bg-bg-base flex items-center justify-between px-3 z-30 select-none text-[8.5px] font-mono tracking-[0.15em] font-semibold text-neon-blue/60",
        className
      )}
    >
      {/* Left Telemetry Cluster */}
      <div className="flex items-center space-x-3.5">
        <div className="flex items-center space-x-1 text-neon-green neon-glow-green">
          <span>SYS:STATUS://OPTIMAL</span>
        </div>
        <span className="text-border-tactical/60">|</span>
        <div className="flex items-center space-x-1">
          <span className="text-neon-blue/40">NODE:</span>
          <span className="text-neon-blue/80">ONLINE</span>
        </div>
        <span className="text-border-tactical/60">|</span>
        <div className="flex items-center space-x-1">
          <span className="text-neon-blue/40">DB:</span>
          <span className="text-neon-blue/80">CONNECTED</span>
        </div>
        <span className="text-border-tactical/60">|</span>
        <div className="flex items-center space-x-1">
          <span className="text-neon-blue/40">PLAYWRIGHT:</span>
          <span className="text-neon-green/90">READY</span>
        </div>
      </div>

      {/* Right Telemetry Cluster */}
      <div className="flex items-center space-x-3.5">
        <div className="flex items-center space-x-1">
          <span className="text-neon-blue/40">MEM:</span>
          <span className="text-neon-blue/85">{memory.toFixed(2)}GB</span>
        </div>
        <span className="text-border-tactical/60">|</span>
        <div className="flex items-center space-x-1">
          <span className="text-neon-blue/40">LAT:</span>
          <span className="text-neon-blue/85">{latency}MS</span>
        </div>
        <span className="text-border-tactical/60">|</span>
        <div className="flex items-center space-x-1.5 text-neon-blue/80">
          <StatusIndicator color="blue" size="sm" pulse />
          <span className="text-[8px] tracking-[0.2em] font-bold">NEXUS_TELEMETRY_ACTIVE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
