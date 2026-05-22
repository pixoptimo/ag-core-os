import React from "react";
import clsx from "clsx";

export interface TelemetryLabelProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "grey";
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const TelemetryLabel: React.FC<TelemetryLabelProps> = ({
  children,
  color = "blue",
  size = "xs",
  className,
}) => {
  const colorClasses = {
    blue: "text-neon-blue/80",
    green: "text-neon-green/80",
    red: "text-neon-red/80",
    grey: "text-border-tactical",
  };

  const sizeClasses = {
    xs: "text-[8.5px] tracking-[0.22em]",
    sm: "text-[10px] tracking-[0.18em]",
    md: "text-xs tracking-[0.15em]",
  };

  return (
    <span
      className={clsx(
        "font-mono uppercase select-none font-semibold",
        colorClasses[color],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default TelemetryLabel;
