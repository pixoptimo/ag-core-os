"use client";

import React from 'react';

export default function SentinelPage() {
  return (
    <div className="flex-grow p-4 flex flex-col space-y-4 text-neon-blue bg-bg-base/30 relative">
      <div className="border border-border-tactical/60 bg-surface-dim/20 p-4 relative">
        <span className="absolute top-0 left-0 w-2 h-[1px] bg-border-tactical" />
        <span className="absolute top-0 left-0 w-[1px] h-2 bg-border-tactical" />
        <h1 className="text-xl font-bold tracking-wider font-mono">SENTINEL MODULE</h1>
        <p className="mt-2 text-xs text-neon-blue/80 font-mono">
          Security gateway, log validation, and shield status. Intrusion detection system active.
        </p>
      </div>
    </div>
  );
}
