import React from "react";
import clsx from "clsx";

export interface TacticalDividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  dashed?: boolean;
  withEnds?: boolean;
}

export const TacticalDivider: React.FC<TacticalDividerProps> = ({
  orientation = "horizontal",
  className,
  dashed = false,
  withEnds = false,
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={clsx(
        "relative flex items-center justify-between",
        isHorizontal ? "w-full" : "h-full flex-col",
        className
      )}
    >
      {withEnds && (
        <span
          className={clsx(
            "bg-border-tactical/80 block shrink-0",
            isHorizontal ? "w-1 h-1" : "w-1 h-1"
          )}
        />
      )}
      
      <div
        className={clsx(
          "flex-grow border-border-tactical/50",
          isHorizontal 
            ? clsx("w-full border-t", dashed ? "border-dashed" : "border-solid") 
            : clsx("h-full border-l", dashed ? "border-dashed" : "border-solid")
        )}
      />

      {withEnds && (
        <span
          className={clsx(
            "bg-border-tactical/80 block shrink-0",
            isHorizontal ? "w-1 h-1" : "w-1 h-1"
          )}
        />
      )}
    </div>
  );
};

export default TacticalDivider;
