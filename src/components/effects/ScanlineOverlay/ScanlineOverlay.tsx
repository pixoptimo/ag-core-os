import React from "react";
import clsx from "clsx";

export interface ScanlineOverlayProps {
  className?: string;
  enableFlicker?: boolean;
  enableScanlineScroll?: boolean;
}

export const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({
  className,
  enableFlicker = true,
  enableScanlineScroll = true,
}) => {
  return (
    <div
      className={clsx(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden select-none",
        enableFlicker && "animate-flicker",
        className
      )}
    >
      {/* 1. Base Scanline Gradients Overlay */}
      <div className="absolute inset-0 scanlines-overlay opacity-[0.08]" />

      {/* 2. Scroll Animation Scanline */}
      {enableScanlineScroll && (
        <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-transparent via-neon-blue/8 to-transparent animate-scanline pointer-events-none opacity-20" />
      )}

      {/* 3. CRT Corner Shadow Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-30 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />

      {/* 4. CRT Phosphor Screen Inner Glow */}
      <div className="absolute inset-0 animate-crt-glow pointer-events-none" />
      
      {/* 5. Fine Film Grain/Noise Texture Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.9]" />
    </div>
  );
};

export default ScanlineOverlay;
