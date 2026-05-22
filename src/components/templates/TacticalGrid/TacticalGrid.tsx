import React from "react";
import clsx from "clsx";

export interface TacticalGridProps {
  className?: string;
  showDots?: boolean;
}

export const TacticalGrid: React.FC<TacticalGridProps> = ({
  className,
  showDots = true,
}) => {
  return (
    <div className={clsx("absolute inset-0 pointer-events-none z-0 overflow-hidden select-none", className)}>
      {/* Visual Sub-pixel Grid Lines */}
      <div className="absolute inset-0 tactical-grid-bg opacity-[0.35]" />

      {/* Visual Sub-pixel Grid Dots */}
      {showDots && (
        <div className="absolute inset-0 tactical-grid-dots opacity-[0.45]" />
      )}

      {/* Center crosshair decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-15">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neon-blue" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-neon-blue" />
      </div>

      {/* Subtle CRT corner bracket decorations */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-border-tactical/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-border-tactical/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-border-tactical/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-border-tactical/30 pointer-events-none" />

      {/* CRT Curvature Screen Tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-surface-dim/15 via-transparent to-surface-dim/25 pointer-events-none" />
    </div>
  );
};

export default TacticalGrid;
