import { type FC } from "react";

interface SidebarButtonProps {
  label: string;
  icon: FC<{ className?: string }>;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
  idPrefix?: string;
}

export function SidebarButton({
  label,
  icon: Icon,
  isActive = false,
  onClick,
  badge,
  idPrefix = "rail",
}: SidebarButtonProps) {
  const elementId = `${idPrefix}-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <button
      id={elementId}
      className={`relative flex items-center justify-center md:w-11 md:h-11 w-9 h-9 md:rounded-lg rounded-md cursor-pointer transition-all duration-150 ${
        isActive
          ? "bg-[#F9F5FF] dark:bg-[#1F242F] text-[#6941C6] dark:text-[#B692F6]"
          : "text-[#667085] dark:text-[#94969C] hover:bg-[#F2F4F7] dark:hover:bg-[#1F242F] hover:text-[#344054] dark:hover:text-[#CECFD2]"
      }`}
      onClick={onClick}
      title={label}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="md:w-[22px] md:h-[22px] w-[18px] h-[18px]" />
      {badge != null && (
        <span className="absolute top-0.5 right-0.5 md:top-1 md:right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-[#F04438] text-white text-[9px] font-bold flex items-center justify-center leading-none border-2 border-white dark:border-[#0C111D]">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}
