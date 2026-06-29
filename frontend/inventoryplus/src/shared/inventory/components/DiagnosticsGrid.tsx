import React, { memo } from 'react';
import InfoCard from '../Card';

// Custom Clean SVG Icons (moved from Inventory.tsx for co-location with the grid)
const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <line x1="6" y1="8" x2="6" y2="8" />
    <line x1="10" y1="8" x2="10" y2="8" />
    <line x1="14" y1="8" x2="14" y2="8" />
    <line x1="18" y1="8" x2="18" y2="8" />
    <line x1="6" y1="12" x2="6" y2="12" />
    <line x1="10" y1="12" x2="10" y2="12" />
    <line x1="14" y1="12" x2="14" y2="12" />
    <line x1="18" y1="12" x2="18" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
);

const normalizeSpecCategory = (items: any): any[][] => {
  if (!items || items.length === 0) return [[]];
  if (!Array.isArray(items[0])) {
    return [items];
  }
  return items;
};

const ALL_CATEGORIES = [
  { title: "Asset Details", key: "assets" },
  { title: "Operating System", key: "os" },
  { title: "Motherboard", key: "motherboard" },
  { title: "CPU", key: "cpu" },
  { title: "RAM", key: "ram" },
  { title: "Storage", key: "storage" },
  { title: "GPU", key: "gpu" },
  { title: "Monitor", key: "monitor" },
  { title: "Network", key: "network" },
  { title: "Peripherals", key: "peripherals" }
];

// Icon and variant mappings for each category
const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; variant: 'green' | 'orange' | 'blue' | 'beige' }> = {
  "Asset Details":      { icon: <MonitorIcon />,   variant: "green" },
  "Operating System":   { icon: <GlobeIcon />,     variant: "green" },
  "Motherboard":        { icon: <CpuIcon />,       variant: "orange" },
  "CPU":                { icon: <CpuIcon />,       variant: "orange" },
  "RAM":                { icon: <MonitorIcon />,   variant: "blue" },
  "Storage":            { icon: <MonitorIcon />,   variant: "blue" },
  "GPU":                { icon: <MonitorIcon />,   variant: "blue" },
  "Monitor":            { icon: <MonitorIcon />,   variant: "blue" },
  "Network":            { icon: <GlobeIcon />,     variant: "beige" },
  "Peripherals":        { icon: <KeyboardIcon />,  variant: "green" },
};

// Multi-instance categories that need normalization
const MULTI_INSTANCE_KEYS = ["os", "ram", "storage", "monitor", "peripherals"];

// --- Memoized SpecCard ---
interface SpecCardProps {
  title: string;
  categoryKey: string;
  items: any;
  onEdit: () => void;
}

const SpecCard = memo(function SpecCard({ title, categoryKey, items, onEdit }: SpecCardProps) {
  const config = CATEGORY_CONFIG[title];
  if (!config) return null;

  // Determine the display items
  let displayItems = items;

  // Special filtering for Asset Details (hide Asset UUID and Omada Username)
  if (categoryKey === "assets") {
    displayItems = (items || []).filter((item: any) => item.label !== "Asset UUID" && item.label !== "Omada Username");
  } else if (MULTI_INSTANCE_KEYS.includes(categoryKey)) {
    displayItems = normalizeSpecCategory(items);
  }

  return (
    <InfoCard
      title={title}
      icon={config.icon}
      variant={config.variant}
      items={displayItems}
      onEdit={onEdit}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if items actually changed
  return JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items);
});


// --- DiagnosticsGrid ---
interface DiagnosticsGridProps {
  specs: any;
  memberName: string;
  onCardEdit: (cardTitle: string, currentItems: any[]) => void;
  onAddSpecCard: (cardTitle: string, currentSpecs: any) => void;
  addCardDropdownOpen: boolean;
  setAddCardDropdownOpen: (open: boolean) => void;
}

export default function DiagnosticsGrid({
  specs,
  memberName,
  onCardEdit,
  onAddSpecCard,
  addCardDropdownOpen,
  setAddCardDropdownOpen,
}: DiagnosticsGridProps) {
  const hiddenCategories = ALL_CATEGORIES.filter(cat => {
    const val = specs[cat.key];
    if (!val || val.length === 0) return true;
    if (cat.key === "assets") {
      const displayable = (val || []).filter((item: any) => item.label !== "Asset UUID" && item.label !== "Omada Username");
      return !displayable.some((item: any) => item.value !== "");
    }
    return false;
  });

  // Build the card click handler for a given category
  const getEditHandler = (title: string, key: string) => {
    return () => {
      let items = specs[key];
      if (key === "assets") {
        items = (items || []).filter((item: any) => item.label !== "Asset UUID" && item.label !== "Omada Username");
      } else if (MULTI_INSTANCE_KEYS.includes(key)) {
        items = normalizeSpecCategory(items);
      }
      onCardEdit(title, items);
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-h)', margin: 0 }}>
          {memberName}'s Workstation Diagnostics
        </h3>
        {hiddenCategories.length > 0 && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setAddCardDropdownOpen(!addCardDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--code-bg)",
                color: "var(--text-h)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                outline: "none"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--text-muted)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.backgroundColor = "var(--code-bg)";
              }}
            >
              <span>+ Add Hardware Specification</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: addCardDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }}
              >
                <path d="M2 4L6 8L10 4" />
              </svg>
            </button>

            {addCardDropdownOpen && (
              <>
                <div
                  onClick={() => setAddCardDropdownOpen(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 998,
                    cursor: "default"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    zIndex: 999,
                    minWidth: "220px",
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08)",
                    padding: "6px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px"
                  }}
                >
                  {hiddenCategories.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => {
                        onAddSpecCard(cat.title, specs);
                        setAddCardDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "var(--text-h)",
                        fontSize: "13px",
                        fontWeight: 500,
                        textAlign: "left",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#7F56D9";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--text-h)";
                      }}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        width: '100%',
      }}>
        {/* Asset Details (special filtering) */}
        {specs.assets && (specs.assets || []).filter((item: any) => item.label !== "Asset UUID" && item.label !== "Omada Username").some((item: any) => item.value !== "") && (
          <SpecCard
            title="Asset Details"
            categoryKey="assets"
            items={specs.assets}
            onEdit={getEditHandler("Asset Details", "assets")}
          />
        )}

        {/* Empty state */}
        {hiddenCategories.length === ALL_CATEGORIES.length && (
          <div style={{
            gridColumn: "1 / -1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            border: "2px dashed var(--border)",
            borderRadius: "16px",
            color: "var(--text)",
            textAlign: "center",
            gap: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.02)"
          }}>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-h)" }}>No specifications added yet</span>
            <span style={{ fontSize: "13px", opacity: 0.8 }}>Select a category from the dropdown above to start configuring this workstation.</span>
          </div>
        )}

        {/* All other categories */}
        {specs.os && specs.os.length > 0 && (
          <SpecCard title="Operating System" categoryKey="os" items={specs.os} onEdit={getEditHandler("Operating System", "os")} />
        )}

        {specs.motherboard && specs.motherboard.length > 0 && (
          <SpecCard title="Motherboard" categoryKey="motherboard" items={specs.motherboard} onEdit={getEditHandler("Motherboard", "motherboard")} />
        )}

        {specs.cpu && specs.cpu.length > 0 && (
          <SpecCard title="CPU" categoryKey="cpu" items={specs.cpu} onEdit={getEditHandler("CPU", "cpu")} />
        )}

        {specs.ram && specs.ram.length > 0 && (
          <SpecCard title="RAM" categoryKey="ram" items={specs.ram} onEdit={getEditHandler("RAM", "ram")} />
        )}

        {specs.storage && specs.storage.length > 0 && (
          <SpecCard title="Storage" categoryKey="storage" items={specs.storage} onEdit={getEditHandler("Storage", "storage")} />
        )}

        {specs.gpu && specs.gpu.length > 0 && (
          <SpecCard title="GPU" categoryKey="gpu" items={specs.gpu} onEdit={getEditHandler("GPU", "gpu")} />
        )}

        {specs.monitor && specs.monitor.length > 0 && (
          <SpecCard title="Monitor" categoryKey="monitor" items={specs.monitor} onEdit={getEditHandler("Monitor", "monitor")} />
        )}

        {specs.network && specs.network.length > 0 && (
          <SpecCard title="Network" categoryKey="network" items={specs.network} onEdit={getEditHandler("Network", "network")} />
        )}

        {specs.peripherals && specs.peripherals.length > 0 && (
          <SpecCard title="Peripherals" categoryKey="peripherals" items={specs.peripherals} onEdit={getEditHandler("Peripherals", "peripherals")} />
        )}
      </div>
    </div>
  );
}
