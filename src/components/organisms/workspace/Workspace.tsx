"use client";

import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import TelemetryBox from "../../molecules/TelemetryBox/TelemetryBox";
import StatusIndicator from "../../atoms/indicators/StatusIndicator";
import TelemetryLabel from "../../atoms/labels/TelemetryLabel";
import TacticalDivider from "../../atoms/dividers/TacticalDivider";
import * as Icons from "lucide-react";

export interface WorkspaceProps {
  className?: string;
}

interface LogLine {
  type: "INFO" | "OK" | "WARN";
  content: string;
  time: string;
}

const INITIAL_LOGS: LogLine[] = [
  { type: "INFO", content: "ORCHESTRATION_EVENT::NODE_042 RECEIVED PACKET 429A", time: "09:01:10" },
  { type: "OK", content: "VALIDATION_HANDSHAKE::SUCCESS IN SECTOR 7", time: "09:01:12" },
  { type: "OK", content: "INGESTION_SYNC::COMPLETE // PIPELINE_04 FLUSHED", time: "09:01:15" },
  { type: "WARN", content: "PIPELINE_RETRY::DETECTED // OFFSET_12", time: "09:01:22" },
  { type: "OK", content: "HEURISTIC_OPTIMIZATION::APPLIED", time: "09:01:30" },
];

const LOG_POOL = [
  { type: "INFO", content: "RELAY_STREAM::CONNECTED TO US-EAST HUB" },
  { type: "OK", content: "COMPACTING ARCHIVE_SECTOR::04 SUCCESSFULLY" },
  { type: "INFO", content: "CHRONOS_SCHEDULER::DISPATCHING JOBS IN SECTOR 3" },
  { type: "WARN", content: "SYNAPSE_SIGNAL::CONGESTION DETECTED ON PORT_8080" },
  { type: "OK", content: "INTELLIGENCE_ENGINE::HEURISTIC SYNAPSE RE-CALIBRATED" },
  { type: "OK", content: "SENTINEL_SHIELD::INTEGRITY VERIFIED // 100% SECURE" },
  { type: "INFO", content: "STITCH_MERGER::CONCATENATING PIPELINES_08 AND PIPELINES_12" },
  { type: "WARN", content: "REGIONAL_SYNC::IN-MUM REPORTED SLIGHT PACKET DROP // RETRYING" },
  { type: "OK", content: "PLAYWRIGHT_WORKER::BROWSER CONTAINER INITIALIZED" },
];

export const Workspace: React.FC<WorkspaceProps> = ({ className }) => {
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [signalBars, setSignalBars] = useState<number[]>([4, 4, 3, 5, 4]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Log streaming simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      setLogs((prev) => {
        const next = [...prev, { ...randomLog, time: timeStr } as LogLine];
        return next.length > 50 ? next.slice(1) : next;
      });

      // Also fluctuate signal strength bars occasionally
      setSignalBars((prev) =>
        prev.map((val) => {
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
          const nextVal = val + change;
          return nextVal >= 1 && nextVal <= 5 ? nextVal : val;
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx("flex-grow p-2 flex flex-col space-y-2 overflow-y-auto select-none bg-bg-base/30 relative", className)}>
      {/* 1. TOP STATS ROW (12-column visual grid rhythm) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <TelemetryBox label="PIPELINES_ACTIVE" value="14" />
        <TelemetryBox label="RUNTIME_HEALTH" value="99.9%" valueColor="green" />
        <TelemetryBox label="ACTIVE_REGIONS" value="06" />
        <TelemetryBox label="QUEUE_DEPTH" value="42" />
        <TelemetryBox label="VALIDATION" value="PASS" valueColor="green" />
        <TelemetryBox label="UPTIME_ORD" value="248H" />
      </div>

      {/* 2. TACTICAL PANELS (Left Column, Middle Column, Right Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 flex-grow min-h-0">
        
        {/* LEFT COLUMN: MODULE STATUS (lg:span-3) */}
        <div className="lg:col-span-3 border border-border-tactical/60 bg-surface-dim/20 flex flex-col justify-between p-2 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-2 h-[1px] bg-border-tactical" />
          <span className="absolute top-0 left-0 w-[1px] h-2 bg-border-tactical" />
          
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-border-tactical/35 mb-2.5">
              <TelemetryLabel color="blue" size="sm">MODULE_STATUS</TelemetryLabel>
              <Icons.Activity size={11} className="text-neon-blue/60" />
            </div>

            <div className="space-y-2">
              {[
                { name: "PULSE", desc: "INGESTING", color: "green" as const },
                { name: "CHRONOS", desc: "SCHEDULED", color: "blue" as const },
                { name: "STITCH", desc: "PROCESSING", color: "blue" as const },
                { name: "SENTINEL", desc: "VALIDATING", color: "green" as const },
                { name: "ARCHIVE", desc: "RETAINING", color: "grey" as const },
                { name: "CONFIG", desc: "STABLE", color: "green" as const },
              ].map((mod) => (
                <div key={mod.name} className="flex flex-col space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9.5px] font-extrabold text-neon-blue/80 tracking-wider">
                      {mod.name}
                    </span>
                    <StatusIndicator color={mod.color} size="sm" pulse={mod.color === "green"} />
                  </div>
                  <span className={clsx(
                    "font-mono text-[8px] tracking-wider uppercase font-semibold",
                    mod.color === "green" && "text-neon-green/80",
                    mod.color === "blue" && "text-neon-blue/70",
                    mod.color === "grey" && "text-border-tactical"
                  )}>
                    {mod.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SIGNAL_CONF Level Indicators */}
          <div className="pt-2 border-t border-border-tactical/35 mt-3">
            <TelemetryLabel color="grey" size="xs" className="mb-1 block">SIGNAL_CONF</TelemetryLabel>
            <div className="flex items-end space-x-1 h-4.5">
              {signalBars.map((level, idx) => (
                <div key={idx} className="flex-grow flex flex-col justify-end h-full">
                  <div className="w-full bg-border-tactical/20 border border-border-tactical/40 relative h-full">
                    {/* Active filled level bars */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-neon-green/75 border-t border-neon-green/90 transition-all duration-300"
                      style={{ height: `${(level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: PIPELINE MONITOR ONLY (lg:span-6) */}
        <div className="lg:col-span-6 border border-border-tactical/60 bg-surface-dim/20 p-2 flex flex-col relative overflow-hidden">
          <span className="absolute top-0 left-0 w-2 h-[1px] bg-border-tactical" />
          <span className="absolute top-0 left-0 w-[1px] h-2 bg-border-tactical" />
          
          <div className="flex items-center justify-between pb-1.5 border-b border-border-tactical/35 mb-2.5">
            <TelemetryLabel color="blue" size="sm">ACTIVE_PIPELINE_MONITOR</TelemetryLabel>
            <div className="flex items-center space-x-1.5">
              <span className="font-mono text-[8px] tracking-wider text-neon-blue/60 uppercase">
                LATENCY_AVG: 124MS
              </span>
              <Icons.BarChart2 size={11} className="text-neon-blue/60" />
            </div>
          </div>

          {/* Pipelines visual flows */}
          <div className="space-y-2 flex-grow flex flex-col justify-center">
            
            {/* Pipeline 1: GTA VI Trends */}
            <div className="border border-neon-blue/30 bg-surface-mid/10 p-2 relative">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="font-mono text-[10px] font-black text-neon-blue tracking-wide">GTA VI TRENDS</h4>
                  <span className="font-mono text-[8px] text-border-tactical/80">UUID: 429A-X90</span>
                </div>
                <span className="font-mono text-[8px] font-bold text-neon-blue border border-neon-blue/40 px-1.5 py-0.5 bg-neon-blue/5 tracking-wider uppercase">
                  STITCH::ACTIVE
                </span>
              </div>

              {/* Pipeline flow nodes */}
              <div className="relative flex items-center justify-between py-1 mt-2.5 px-1">
                <div className="absolute left-4 right-4 h-[1px] bg-border-tactical/40 z-0" />
                
                {[
                  { label: "INGEST", status: "done" },
                  { label: "STITCH", status: "active" },
                  { label: "VAL", status: "pending" },
                  { label: "DEPLOY", status: "pending" }
                ].map((node, i) => (
                  <div key={node.label} className="flex flex-col items-center z-10">
                    <div className={clsx(
                      "w-2 h-2 rounded-full border flex items-center justify-center transition-all duration-300",
                      node.status === "done" && "bg-neon-green/30 border-neon-green",
                      node.status === "active" && "bg-neon-blue border-neon-blue shadow-[0_0_6px_#89ceff]",
                      node.status === "pending" && "bg-surface-dim border-border-tactical"
                    )}>
                      {node.status === "done" && <div className="w-0.5 h-0.5 bg-neon-green rounded-full" />}
                      {node.status === "active" && <div className="w-0.5 h-0.5 bg-white rounded-full animate-ping" />}
                    </div>
                    <span className={clsx(
                      "font-mono text-[7px] tracking-widest uppercase font-semibold mt-1",
                      node.status === "done" && "text-neon-green/80",
                      node.status === "active" && "text-neon-blue",
                      node.status === "pending" && "text-border-tactical"
                    )}>
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Mini-bar */}
              <div className="mt-2.5 flex items-center justify-between">
                <span className="font-mono text-[8px] text-border-tactical">RETRY_ST: 0</span>
                <div className="w-24 bg-border-tactical/25 h-1 border border-border-tactical/40">
                  <div className="bg-neon-blue h-full w-[45%]" />
                </div>
              </div>
            </div>

            {/* Pipeline 2: Elden Ring DLC */}
            <div className="border border-border-tactical/40 bg-surface-dim/40 p-2 relative">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="font-mono text-[10px] font-bold text-neon-blue/80 tracking-wide">ELDEN RING DLC</h4>
                  <span className="font-mono text-[8px] text-border-tactical/80">UUID: 184B-Z12</span>
                </div>
                <span className="font-mono text-[8px] font-bold text-border-tactical border border-border-tactical/40 px-1.5 py-0.5 tracking-wider uppercase">
                  CHRONOS::QUEUED
                </span>
              </div>

              {/* Pipeline flow nodes */}
              <div className="relative flex items-center justify-between py-1 mt-2.5 px-1">
                <div className="absolute left-4 right-4 h-[1px] bg-border-tactical/20 z-0" />
                
                {[
                  { label: "INGEST", status: "pending" },
                  { label: "STITCH", status: "pending" },
                  { label: "VAL", status: "pending" },
                  { label: "DEPLOY", status: "pending" }
                ].map((node) => (
                  <div key={node.label} className="flex flex-col items-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full border border-border-tactical/50 bg-surface-dim" />
                    <span className="font-mono text-[7px] tracking-widest uppercase font-semibold text-border-tactical mt-1">
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: REGIONAL MATRIX (lg:span-3) */}
        <div className="lg:col-span-3 border border-border-tactical/60 bg-surface-dim/20 p-2 relative overflow-hidden flex flex-col">
          <span className="absolute top-0 left-0 w-2 h-[1px] bg-border-tactical" />
          <span className="absolute top-0 left-0 w-[1px] h-2 bg-border-tactical" />
          
          <div className="flex items-center justify-between pb-1.5 border-b border-border-tactical/35 mb-2.5">
            <TelemetryLabel color="blue" size="sm">REGIONAL_MATRIX</TelemetryLabel>
            <Icons.Globe size={11} className="text-neon-blue/60" />
          </div>

          <div className="grid grid-cols-2 gap-2 flex-grow">
            {[
              { code: "US-EAST", sync: "100%", active: true, chart: [3, 4, 5, 2] },
              { code: "UK-LON", sync: "94%", active: true, chart: [2, 3, 2, 4] },
              { code: "IN-MUM", sync: "ACTIVE", active: true, pulse: true },
              { code: "JP-TOK", sync: "100%", active: true, chart: [1, 2, 3, 5] },
              { code: "AU-SYD", sync: "IDLE", active: false },
              { code: "CN-SHG", sync: "ALERT", active: false, alert: true },
            ].map((region) => (
              <div key={region.code} className="border border-border-tactical/35 bg-surface-dim/50 p-1.5 relative flex flex-col justify-between h-full">
                <span className="absolute top-0 left-0 w-1 h-[1px] bg-border-tactical/60" />
                <span className="absolute top-0 left-0 w-[1px] h-1 bg-border-tactical/60" />
                
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] font-bold text-neon-blue/90">
                    {region.code}
                  </span>
                  {region.active && (
                    <Icons.Radio size={9} className="text-neon-green/75 animate-pulse" />
                  )}
                  {region.alert && (
                    <StatusIndicator color="red" size="sm" pulse />
                  )}
                </div>

                {/* mini bar graphics */}
                {region.chart && (
                  <div className="flex items-end space-x-0.5 h-4.5 mb-1">
                    {region.chart.map((val, i) => (
                      <div 
                        key={i} 
                        className="bg-neon-blue/70 w-1"
                        style={{ height: `${(val / 5) * 100}%` }}
                      />
                    ))}
                  </div>
                )}

                {region.pulse && (
                  <div className="w-full bg-border-tactical/15 h-[2px] relative mb-2.5 overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-neon-green/70 animate-[scanline_2s_linear_infinite]" />
                  </div>
                )}

                {!region.chart && !region.pulse && (
                  <div className="h-4.5 flex items-center justify-center text-border-tactical text-[8px] mb-1 font-mono">
                    --
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-border-tactical/25">
                  <span className="font-mono text-[7.5px] text-border-tactical">SYNC:</span>
                  <span className={clsx(
                    "font-mono text-[7.5px] font-extrabold uppercase",
                    region.alert && "text-neon-red neon-glow-red animate-pulse",
                    region.sync === "100%" && "text-neon-green",
                    region.sync === "ACTIVE" && "text-neon-green",
                    region.sync === "IDLE" && "text-border-tactical"
                  )}>
                    {region.sync}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. TERMINAL PANEL - FULL WIDTH (directly below the upper grid panels) */}
      <div className="border border-border-tactical/60 bg-[#02040b] p-2 h-36 flex flex-col relative overflow-hidden shrink-0">
        <span className="absolute top-0 left-0 w-2 h-[1px] bg-border-tactical" />
        <span className="absolute top-0 left-0 w-[1px] h-2 bg-border-tactical" />
        
        <div className="flex items-center justify-between pb-1.5 border-b border-border-tactical/35 mb-2">
          <TelemetryLabel color="green" size="sm">AG_TERMINAL::NEXUS_FEED</TelemetryLabel>
          <span className="font-mono text-[8px] tracking-wider text-border-tactical/80 uppercase font-semibold">
            SESSION_LOG_ACTIVE
          </span>
        </div>

        {/* Scrollable logs screen */}
        <div className="flex-grow overflow-y-auto font-mono text-[8.5px] leading-3.5 space-y-1 pr-2 select-text">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-border-tactical mr-2 shrink-0 select-none">
                [{log.time}]
              </span>
              
              <span className={clsx(
                "mr-2 font-black tracking-wider shrink-0 select-none",
                log.type === "INFO" && "text-neon-blue",
                log.type === "OK" && "text-neon-green",
                log.type === "WARN" && "text-neon-red"
              )}>
                [{log.type}]
              </span>

              <span className={clsx(
                "flex-grow",
                log.type === "INFO" && "text-neon-blue/80",
                log.type === "OK" && "text-neon-blue/95",
                log.type === "WARN" && "text-neon-red/90"
              )}>
                {log.content}
              </span>
            </div>
          ))}
          
          {/* Blinking input cursor prompt */}
          <div className="flex items-center text-neon-green/90 select-none mt-1">
            <span className="mr-1.5">&gt;</span>
            <span className="mr-1">Monitoring stream active...</span>
            <span className="w-1.5 h-3 bg-neon-green animate-cursor-blink" />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
