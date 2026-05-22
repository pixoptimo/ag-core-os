import React from "react";
import clsx from "clsx";
import TelemetryLabel from "../../atoms/labels/TelemetryLabel";

export interface TelemetryBoxProps {
  label: string;
  value: string | number;
  valueColor?: "blue" | "green" | "red";
  className?: string;
  subValue?: string;
}

export const TelemetryBox: React.FC<TelemetryBoxProps> = ({
  label,
  value,
  valueColor = "blue",
  className,
  subValue,
}) => {
  const colorMap = {
    blue: "text-neon-blue neon-glow-blue",
    green: "text-neon-green neon-glow-green",
    red: "text-neon-red neon-glow-red",
  };

  return (
    <div
      className={clsx(
        "bg-surface-dim/30 border border-border-tactical/60 py-1 px-2.5 relative flex flex-col justify-between select-none transition-all duration-200 hover:bg-surface-mid/30 hover:border-border-tactical/90 overflow-hidden",
        className
      )}
    >
      {/* Decorative military-style panel corners */}
      <span className="absolute top-0 left-0 w-1 h-[1px] bg-border-tactical/90" />
      <span className="absolute top-0 left-0 w-[1px] h-1 bg-border-tactical/90" />
      <span className="absolute bottom-0 right-0 w-1 h-[1px] bg-border-tactical/90" />
      <span className="absolute bottom-0 right-0 w-[1px] h-1 bg-border-tactical/90" />

      {/* Label */}
      <TelemetryLabel color="grey" size="xs" className="mb-0.5 block">
        {label}
      </TelemetryLabel>

      {/* Value block */}
      <div className="flex items-baseline justify-between">
        <span className={clsx("font-mono text-xs font-black leading-none tracking-wider", colorMap[valueColor])}>
          {value}
        </span>
        {subValue && (
          <span className="font-mono text-[8px] text-border-tactical uppercase tracking-wider ml-2">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default TelemetryBox;
