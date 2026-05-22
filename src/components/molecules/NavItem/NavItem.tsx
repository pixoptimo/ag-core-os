import React from "react";
import clsx from "clsx";
import * as Icons from "lucide-react";

export interface NavItemProps {
  label: string;
  iconName: keyof typeof Icons;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  iconName,
  active = false,
  onClick,
  className,
}) => {
  // Dynamically resolve lucide icons
  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string; size?: number }>;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative flex items-center w-full py-1.5 px-2.5 font-mono text-[9.5px] font-extrabold tracking-[0.2em] transition-all duration-150 uppercase border-r-0 select-none text-left cursor-pointer",
        active 
          ? "bg-neon-blue/10 text-neon-blue border-l-2 border-neon-blue neon-glow-blue" 
          : "text-neon-blue/50 hover:text-neon-blue/90 hover:bg-surface-mid/40 border-l-2 border-transparent",
        className
      )}
    >
      {/* Visual background scanning bar on hover */}
      <span className="absolute inset-y-0 left-0 w-0 bg-neon-blue/5 transition-all duration-300 group-hover:w-full" />
      
      {/* Icon slot */}
      {IconComponent && (
        <span className={clsx(
          "mr-2 transition-transform duration-200 group-hover:scale-105 shrink-0",
          active ? "text-neon-blue" : "text-neon-blue/40 group-hover:text-neon-blue/75"
        )}>
          <IconComponent size={12} />
        </span>
      )}
      
      {/* Menu Text */}
      <span className="relative flex-grow leading-none">
        {label}
      </span>

      {/* Decorative pulse point when active */}
      {active && (
        <span className="relative flex h-1.5 w-1.5 shrink-0 ml-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-blue"></span>
        </span>
      )}
    </button>
  );
};

export default NavItem;
