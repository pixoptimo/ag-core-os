import React from "react";
import clsx from "clsx";

export interface StatusIndicatorProps {
  color?: "blue" | "green" | "red" | "grey";
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  color = "green",
  pulse = false,
  size = "md",
  className,
}) => {
  const colorClasses = {
    green: "bg-neon-green shadow-[0_0_8px_rgba(0,224,176,0.6)]",
    blue: "bg-neon-blue shadow-[0_0_8px_rgba(137,206,255,0.6)]",
    red: "bg-neon-red shadow-[0_0_8px_rgba(255,180,171,0.6)]",
    grey: "bg-border-tactical",
  };

  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3.5 h-3.5",
  };

  return (
    <span className={clsx("relative inline-flex items-center justify-center", sizeClasses[size], className)}>
      {pulse && (
        <span
          className={clsx(
            "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
            color === "green" && "bg-neon-green",
            color === "blue" && "bg-neon-blue",
            color === "red" && "bg-neon-red",
            color === "grey" && "bg-border-tactical"
          )}
        />
      )}
      <span
        className={clsx(
          "relative inline-flex rounded-full",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
    </span>
  );
};

export default StatusIndicator;
