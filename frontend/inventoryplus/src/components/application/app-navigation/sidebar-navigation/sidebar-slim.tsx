import { useState, useEffect, type FC } from "react";
import type { NavItemType } from "@/components/application/app-navigation/config";
import "./sidebar-slim.css";

interface SidebarNavigationSlimProps {
  items: (NavItemType & { icon: FC<{ className?: string }> })[];
  footerItems?: (NavItemType & { icon: FC<{ className?: string }> })[];
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

export function SidebarNavigationSlim({ items, footerItems }: SidebarNavigationSlimProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = items[activeIndex];
  const subItems = activeItem?.items ?? [];

  return (
    <aside className="sb-slim" id="sidebar-navigation">
      {/* ── Narrow icon rail ── */}
      <div className="sb-rail">
        {/* Logo */}
        <div className="sb-rail-logo">
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
        <nav className="sb-rail-items" aria-label="Main navigation">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeIndex === i;
            return (
              <button
                key={item.label}
                id={`rail-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`sb-rail-btn${isActive ? " is-active" : ""}`}
                onClick={() => setActiveIndex(i)}
                title={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="sb-rail-icon" />
                {item.badge != null && (
                  <span className="sb-rail-badge">{item.badge > 9 ? "9+" : item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer icons */}
        {footerItems && (
          <div className="sb-rail-footer">
            {footerItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  id={`rail-ft-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="sb-rail-btn"
                  title={item.label}
                >
                  <Icon className="sb-rail-icon" />
                </button>
              );
            })}
            {/* Avatar */}
            <div className="sb-rail-avatar" title="User profile">
              <img
                src="https://ui-avatars.com/api/?name=EP&background=F4EBFF&color=7F56D9&size=32&font-size=0.4&bold=true"
                alt="User avatar"
                width="32"
                height="32"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Secondary panel ── */}
      <div className="sb-panel">
        <div className="sb-panel-inner">
          {/* Date/time block */}
          <div className="sb-panel-date">
            <div className="sb-panel-time">{formatTime(now)}</div>
            <div className="sb-panel-datetext">{formatDate(now)}</div>
          </div>

          {/* Section title */}
          <div className="sb-panel-section-title">{activeItem?.label}</div>

          {/* Search */}
          <div className="sb-search-wrap">
            <svg className="sb-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="sidebar-search"
              className="sb-search-input"
              type="text"
              placeholder="Search"
              aria-label="Search navigation"
            />
          </div>

          {/* Nav links */}
          <nav className="sb-panel-nav" aria-label={`${activeItem?.label} sub-navigation`}>
            {subItems.map((sub) => {
              const SubIcon = sub.icon;
              const isSubActive = activeSub === sub.label;
              return (
                <a
                  key={sub.label}
                  href={sub.href}
                  id={`panel-${sub.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`sb-panel-link${isSubActive ? " is-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSub(sub.label);
                  }}
                >
                  {SubIcon && <SubIcon className="sb-panel-link-icon" />}
                  <span className="sb-panel-link-label">{sub.label}</span>
                  {sub.badge != null && (
                    <span className="sb-panel-link-badge">{sub.badge}</span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Documents section */}
          <div className="sb-docs">
            <div className="sb-docs-header">
              <span className="sb-docs-title">Recent documents</span>
            </div>
            {[
              { name: "Q2 Inventory Report", ext: "PDF", color: "#F04438" },
              { name: "Supplier Contracts", ext: "DOC", color: "#3B82F6" },
              { name: "Stock Audit 2026", ext: "XLS", color: "#12B76A" },
              { name: "Return Policy Draft", ext: "DOC", color: "#3B82F6" },
            ].map((doc) => (
              <a key={doc.name} href="#" className="sb-doc-row">
                <span className="sb-doc-badge" style={{ color: doc.color, background: `${doc.color}14` }}>
                  {doc.ext}
                </span>
                <span className="sb-doc-name">{doc.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
