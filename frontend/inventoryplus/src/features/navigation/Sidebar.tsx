import { useState, useEffect, type FC } from "react";
import {
  Archive,
  BarChartSquare02,
  CheckDone01,
  ClockFastForward,
  CurrencyDollarCircle,
  Grid03,
  HomeLine,
  Inbox01,
  LifeBuoy01,
  LineChartUp03,
  NotificationBox,
  Package,
  PieChart03,
  Rows01,
  Settings01,
  Settings03,
  Star01,
  Stars01,
  User01,
  UserSquare,
  Users01,
  UsersPlus,
} from "@untitledui/icons";
export interface NavItemType {
  label: string;
  href: string;
  icon?: FC<{ className?: string }>;
  badge?: number;
  items?: NavItemType[];
}

import { useTheme } from "@/shared/context/ThemeContext";

const navItemsDualTier: (NavItemType & { icon: FC<{ className?: string }> })[] = [
  {
    label: "Home",
    href: "/",
    icon: HomeLine,
    items: [
      { label: "Overview", href: "/overview", icon: Grid03 },
      { label: "Products", href: "/products", icon: Package },
      { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
      { label: "Customers", href: "/customers", icon: Users01 },
      { label: "Inbox", href: "/inbox", icon: Inbox01, badge: 4 },
      { label: "What's new?", href: "/whats-new", icon: Stars01 },
    ],
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChartSquare02,
    items: [
      { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
      { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
      { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
      { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
      { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: ClockFastForward },
      { label: "User reports", href: "/dashboard/user-reports", icon: UserSquare },
      { label: "Manage notifications", href: "/dashboard/manage-notifications", icon: Settings03 },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Rows01,
    items: [
      { label: "View all", href: "/projects/all", icon: Rows01 },
      { label: "Personal", href: "/projects/personal", icon: User01 },
      { label: "Team", href: "/projects/team", icon: Users01 },
      { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
      { label: "Archive", href: "/projects/archive", icon: Archive },
    ],
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckDone01,
    badge: 10,
  },
  {
    label: "Reporting",
    href: "/reporting",
    icon: PieChart03,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users01,
  },
];

interface SidebarNavigationSlimProps {
  items: (NavItemType & { icon: FC<{ className?: string }> })[];
  footerItems?: (NavItemType & { icon: FC<{ className?: string }> })[];
  activeIndex?: number;
  onItemSelect?: (index: number) => void;
  activeSub?: string | null;
  onSubSelect?: (label: string) => void;
}

function formatDate(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

export function SidebarNavigationSlim({
  items,
  footerItems,
  activeIndex: propActiveIndex,
  onItemSelect,
  activeSub: propActiveSub,
  onSubSelect,
}: SidebarNavigationSlimProps) {
  const [localActiveIndex, setLocalActiveIndex] = useState(0);
  const [localActiveSub, setLocalActiveSub] = useState<string | null>("Overview");
  const [now, setNow] = useState(new Date());
  const { theme, setTheme } = useTheme();

  const activeIndex = propActiveIndex !== undefined ? propActiveIndex : localActiveIndex;
  const setActiveIndex = (index: number) => {
    if (onItemSelect) onItemSelect(index);
    setLocalActiveIndex(index);
  };

  const activeSub = propActiveSub !== undefined ? propActiveSub : localActiveSub;
  const setActiveSub = onSubSelect ?? setLocalActiveSub;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = items[activeIndex];
  const subItems = activeItem?.items ?? [];

  return (
    <aside className="group flex items-stretch fixed md:top-3 md:left-3 md:bottom-3 top-2 left-2 bottom-2 z-[100] font-sans antialiased" id="sidebar-navigation">
      {/* Narrow icon rail */}
      <div className="flex flex-col items-center md:w-[60px] w-12 bg-white dark:bg-[#0C111D] rounded-xl md:rounded-2xl border border-[#EAECF0] dark:border-[#1F242F] py-3 md:py-4 shrink-0 shadow-sm md:shadow-md z-10">
        {/* Logo */}
        <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 mb-4 cursor-pointer transition-transform duration-200 hover:scale-[1.08]">
          <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
            <rect x="3" y="2" width="32" height="32" rx="8" fill="url(#logo-grad)" />
            <text x="19" y="22" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">I+</text>
            <defs>
              <linearGradient id="logo-grad" x1="15" y1="26" x2="23" y2="10" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7F56D9" />
                <stop offset="1" stopColor="#9E77ED" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main nav icons */}
        <nav className="flex flex-col items-center gap-0.5 flex-1 w-full px-1.5 md:px-2" aria-label="Main navigation">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeIndex === i;
            return (
              <button
                key={item.label}
                id={`rail-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative flex items-center justify-center md:w-11 md:h-11 w-9 h-9 md:rounded-lg rounded-md cursor-pointer transition-all duration-150 ${isActive
                  ? "bg-[#F9F5FF] dark:bg-[#1F242F] text-[#6941C6] dark:text-[#B692F6]"
                  : "text-[#667085] dark:text-[#94969C] hover:bg-[#F2F4F7] dark:hover:bg-[#1F242F] hover:text-[#344054] dark:hover:text-[#CECFD2]"
                  }`}
                onClick={() => setActiveIndex(i)}
                title={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="md:w-[22px] md:h-[22px] w-[18px] h-[18px]" />
                {item.badge != null && (
                  <span className="absolute top-0.5 right-0.5 md:top-1 md:right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-[#F04438] text-white text-[9px] font-bold flex items-center justify-center leading-none border-2 border-white dark:border-[#0C111D]">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer icons */}
        {footerItems && (
          <div className="flex flex-col items-center gap-0.5 w-full px-1.5 md:px-2 border-t border-[#EAECF0] dark:border-[#1F242F] pt-3 mt-1">
            {footerItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  id={`rail-ft-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative flex items-center justify-center md:w-11 md:h-11 w-9 h-9 md:rounded-lg rounded-md cursor-pointer text-[#667085] dark:text-[#94969C] hover:bg-[#F2F4F7] dark:hover:bg-[#1F242F] hover:text-[#344054] dark:hover:text-[#CECFD2] transition-all duration-150"
                  title={item.label}
                >
                  <Icon className="md:w-[22px] md:h-[22px] w-[18px] h-[18px]" />
                </button>
              );
            })}
            {/* Avatar */}
            <div className="mt-1.5 cursor-pointer relative" title="User profile">
              <img
                className="w-8 h-8 md:w-[34px] md:h-[34px] rounded-full border-2 border-transparent transition-colors duration-200 hover:border-[#D6BBFB] dark:hover:border-[#7F56D9]"
                src="https://ui-avatars.com/api/?name=EP&background=F4EBFF&color=7F56D9&size=32&font-size=0.4&bold=true"
                alt="User avatar"
                width="34"
                height="34"
              />
              <span className="absolute bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#12B76A] border-2 border-white dark:border-[#0C111D] rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Secondary panel */}
      <div className="hidden md:flex w-0 opacity-0 group-hover:w-[260px] group-hover:opacity-100 group-focus-within:w-[260px] group-focus-within:opacity-100 bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-2xl flex-col overflow-hidden shrink-0 ml-2 shadow-lg dark:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
        <div className="min-w-[260px] flex flex-col h-full overflow-y-auto overflow-x-hidden scrollbar-thin">
          {/* Date/time block */}
          <div className="px-5 pt-5 pb-4 border-b border-[#F2F4F7] dark:border-[#1F242F]">
            <div className="text-[22px] font-bold text-[#101828] dark:text-[#F5F5F6] tracking-[-0.4px] leading-tight">{formatTime(now)}</div>
            <div className="text-xs font-medium text-[#667085] dark:text-[#94969C] mt-0.5">{formatDate(now)}</div>
          </div>

          {/* Section title */}
          <div className="px-5 pt-4 pb-2 text-[11px] font-semibold text-[#98A2B3] dark:text-[#85888E] uppercase tracking-wider">{activeItem?.label}</div>

          {/* Search */}
          <div className="relative px-4 mb-1">
            <svg className="absolute left-7 top-1/2 -translate-y-1/2 text-[#98A2B3] dark:text-[#85888E] pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="sidebar-search"
              className="w-full h-9 border border-[#D0D5DD] dark:border-[#333741] rounded-lg bg-white dark:bg-[#161B26] text-[#101828] dark:text-[#F5F5F6] text-xs pl-[34px] pr-3 outline-none transition-all duration-150 shadow-sm focus:border-[#D6BBFB] dark:focus:border-[#7F56D9] focus:ring-4 focus:ring-[#F4EBFF] dark:focus:ring-[rgba(127,86,217,0.15)] placeholder:text-[#98A2B3] dark:placeholder:text-[#85888E]"
              type="text"
              placeholder="Search"
              aria-label="Search navigation"
            />
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-0.5 px-3 py-2" aria-label={`${activeItem?.label} sub-navigation`}>
            {subItems.map((sub) => {
              const SubIcon = sub.icon;
              const isSubActive = activeSub === sub.label;
              return (
                <a
                  key={sub.label}
                  href={sub.href}
                  id={`panel-${sub.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium no-underline transition-all duration-125 cursor-pointer ${isSubActive
                    ? "bg-[#F9F5FF] dark:bg-[#1F242F] text-[#6941C6] dark:text-[#B692F6]"
                    : "text-[#344054] dark:text-[#CECFD2] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] hover:text-[#182230] dark:hover:text-[#F5F5F6]"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSub(sub.label);
                  }}
                >
                  {SubIcon && (
                    <SubIcon className={`w-[18px] h-[18px] shrink-0 ${isSubActive ? "text-[#7F56D9] dark:text-[#B692F6]" : "text-[#667085] dark:text-[#94969C]"
                      }`} />
                  )}
                  <span className="flex-1 truncate">{sub.label}</span>
                  {sub.badge != null && (
                    <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-medium flex items-center justify-center leading-none ${isSubActive ? "bg-[#F4EBFF] dark:bg-[rgba(127,86,217,0.15)] text-[#6941C6] dark:text-[#B692F6]" : "bg-[#F2F4F7] dark:bg-[#1F242F] text-[#344054] dark:text-[#CECFD2]"
                      }`}>{sub.badge}</span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme Selector */}
          <div className="px-5 py-4 border-t border-[#F2F4F7] dark:border-[#1F242F]">
            <div className="text-[11px] font-semibold text-[#98A2B3] dark:text-[#85888E] uppercase tracking-wider mb-2">Theme</div>
            <div className="flex bg-[#F2F4F7] dark:bg-[#161B26] rounded-lg p-1 gap-1">
              <button
                className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md text-xs font-medium cursor-pointer transition-all duration-150 ${theme === 'light'
                  ? 'bg-white text-[#6941C6] shadow-sm'
                  : 'text-[#667085] dark:text-[#94969C] hover:text-[#344054] dark:hover:text-[#CECFD2] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[#1F242F]'
                  }`}
                onClick={() => setTheme('light')}
                title="Light mode"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <span>Light</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md text-xs font-medium cursor-pointer transition-all duration-150 ${theme === 'dark'
                  ? 'bg-white dark:bg-[#1F242F] text-[#6941C6] dark:text-[#B692F6] shadow-sm'
                  : 'text-[#667085] dark:text-[#94969C] hover:text-[#344054] dark:hover:text-[#CECFD2] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[#1F242F]'
                  }`}
                onClick={() => setTheme('dark')}
                title="Dark mode"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
                <span>Dark</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-md text-xs font-medium cursor-pointer transition-all duration-150 ${theme === 'system'
                  ? 'bg-white dark:bg-[#1F242F] text-[#6941C6] dark:text-[#B692F6] shadow-sm'
                  : 'text-[#667085] dark:text-[#94969C] hover:text-[#344054] dark:hover:text-[#CECFD2] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[#1F242F]'
                  }`}
                onClick={() => setTheme('system')}
                title="System preference"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <line x1="8" x2="16" y1="21" y2="21" />
                  <line x1="12" x2="12" y1="17" y2="21" />
                </svg>
                <span>System</span>
              </button>
            </div>
          </div>

          {/* Documents section */}
          <div className="mt-auto border-t border-[#F2F4F7] dark:border-[#1F242F] px-3 pt-3.5 pb-4">
            <div className="px-3 pb-2">
              <span className="text-[11px] font-semibold text-[#98A2B3] dark:text-[#85888E] uppercase tracking-wider">Recent documents</span>
            </div>
            {[
              { name: "Q2 Inventory Report", ext: "PDF", color: "#F04438" },
              { name: "Supplier Contracts", ext: "DOC", color: "#3B82F6" },
              { name: "Stock Audit 2026", ext: "XLS", color: "#12B76A" },
              { name: "Return Policy Draft", ext: "DOC", color: "#3B82F6" },
            ].map((doc) => (
              <a key={doc.name} href="#" className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg no-underline transition-colors duration-120 hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] cursor-pointer">
                <span className="text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded shrink-0" style={{ color: doc.color, background: `${doc.color}14` }}>
                  {doc.ext}
                </span>
                <span className="text-xs font-medium text-[#344054] dark:text-[#CECFD2] truncate">{doc.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export const SidebarNavigationSlimDemo = ({
  activeIndex,
  onItemSelect,
  activeSub,
  onSubSelect,
}: {
  activeIndex?: number;
  onItemSelect?: (index: number) => void;
  activeSub?: string | null;
  onSubSelect?: (label: string) => void;
}) => (
  <SidebarNavigationSlim
    items={navItemsDualTier}
    activeIndex={activeIndex}
    onItemSelect={onItemSelect}
    activeSub={activeSub}
    onSubSelect={onSubSelect}
    footerItems={[
      {
        label: "Support",
        href: "/support",
        icon: LifeBuoy01,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings01,
      },
    ]}
  />
);
