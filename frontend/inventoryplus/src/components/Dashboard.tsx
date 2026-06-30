import React, { useState } from 'react';
import MetricsCards from '../shared/dashboard/components/MetricsCards';
import AssetsTable, { type Asset } from '../shared/dashboard/components/AssetTable';
import DonutChart from '../shared/dashboard/components/DonutChart';
import RecentActivity from '../shared/dashboard/components/RecentActivity';
import RightSidebar from '../features/navigation/RightSidebar';

// ─── Mock Data (will move to hooks/useAssets.ts later) ───────────
const INITIAL_ASSETS: Asset[] = [
  { tag: "AST-1001", name: "Dell Latitude 5420", category: "Laptop", status: "In Use", location: "IT Department", assignedTo: "Emma Johnson", lastUpdated: "May 24, 2024" },
  { tag: "AST-1002", name: "HP EliteDisplay E24", category: "Monitor", status: "In Use", location: "IT Department", assignedTo: "Liam Smith", lastUpdated: "May 23, 2024" },
  { tag: "AST-1003", name: "Canon imageCLASS LBP...", category: "Printer", status: "In Use", location: "Admin Office", assignedTo: "Olivia Brown", lastUpdated: "May 22, 2024" },
  { tag: "AST-1004", name: "Dell PowerEdge T150", category: "Server", status: "Maintenance", location: "Server Room", assignedTo: "Noah Williams", lastUpdated: "May 21, 2024" },
  { tag: "AST-1005", name: "Yealink T46S IP Phone", category: "Phone", status: "In Use", location: "Sales Department", assignedTo: "Ava Davis", lastUpdated: "May 20, 2024" },
  { tag: "AST-1006", name: "Epson PowerLite 2250U", category: "Projector", status: "Available", location: "Meeting Room 1", assignedTo: "James Wilson", lastUpdated: "May 19, 2024" },
  { tag: "AST-1007", name: "Logitech MK345", category: "Accessory", status: "In Use", location: "Finance Department", assignedTo: "Sophia Martinez", lastUpdated: "May 18, 2024" },
  { tag: "AST-1008", name: "Ergonomic Office Chair", category: "Furniture", status: "In Use", location: "HR Department", assignedTo: "Mason Taylor", lastUpdated: "May 17, 2024" },
];

const CATEGORY_SEGMENTS = [
  { label: 'Laptop',  value: 104, percentage: '41.9%', color: '#12B76A' },
  { label: 'Monitor', value: 48,  percentage: '19.4%', color: '#3B82F6' },
  { label: 'Server',  value: 28,  percentage: '11.3%', color: '#F79009' },
  { label: 'Printer', value: 24,  percentage: '9.7%',  color: '#7F56D9' },
  { label: 'Others',  value: 44,  percentage: '17.7%', color: '#98A2B3' },
];

const STATUS_SEGMENTS = [
  { label: 'In Use',       value: 230, percentage: '92.7%', color: '#12B76A' },
  { label: 'Available',    value: 12,  percentage: '4.8%',  color: '#3B82F6' },
  { label: 'Maintenance',  value: 18,  percentage: '2.5%',  color: '#F79009' },
  { label: 'Retired',      value: 7,   percentage: '2.0%',  color: '#98A2B3' },
];

const PEOPLE_ITEMS = [
  "Emma Johnson (emma.johnson@example.com)",
  "Liam Smith (liam.smith@example.com)",
  "Olivia Brown (olivia.brown@example.com)",
  "Noah Williams (noah.williams@example.com)",
  "Ava Davis (ava.davis@example.com)",
  "James Wilson (james.wilson@example.com)",
  "Sophia Martinez (sophia.martinez@example.com)",
  "Mason Taylor (mason.taylor@example.com)",
];

// ─── Props ───────────────────────────────────────────────────────
interface DashboardProps {
  showRightSidebar: boolean;
  setShowRightSidebar: (value: boolean) => void;
}

// ─── Dashboard Orchestrator ──────────────────────────────────────
export default function Dashboard({ showRightSidebar, setShowRightSidebar }: DashboardProps) {
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number>(-1);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full font-sans antialiased text-[#344054] dark:text-[#CECFD2]">

      {/* Left panel: header, metrics, table, charts */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold text-[#101828] dark:text-[#F5F5F6] tracking-[-0.6px]">
            Dashboard
          </h1>
          {/* Toggle People sidebar button */}
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className="h-10 px-4 border border-[#D0D5DD] dark:border-[#333741] rounded-lg text-sm font-semibold bg-white dark:bg-[#161B26] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] flex items-center gap-2 cursor-pointer transition-colors duration-150 shadow-sm text-[#344054] dark:text-[#CECFD2]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {showRightSidebar ? 'Hide People' : 'Show People'}
          </button>
        </div>

        {/* KPI Metrics Row */}
        <MetricsCards />

        {/* Assets Table with search, filters, pagination */}
        <AssetsTable
          assets={INITIAL_ASSETS}
          onAddAsset={() => console.log('Open AddAssetModal')}
          onEditAsset={(asset) => console.log('Open EditAssetModal', asset)}
          onDeleteAsset={(asset) => console.log('Open DeleteAssetModal', asset)}
          onReassignAsset={(asset) => console.log('Open ReassignAssetModal', asset)}
          onRowClick={(asset) => console.log('Open AssetDetailModal', asset)}
        />

        {/* Bottom charts & recent activity row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DonutChart title="Assets by Category" total={248} segments={CATEGORY_SEGMENTS} />
          <DonutChart title="Assets by Status" total={248} segments={STATUS_SEGMENTS} />
          <RecentActivity />
        </div>
      </div>

      {/* Right panel: RightSidebar component (aligned with App-level state and Inventory sidebar style) */}
      <RightSidebar
        isOpen={showRightSidebar}
        title="People"
        items={PEOPLE_ITEMS}
        onClose={() => {
          setShowRightSidebar(false);
          setSelectedPersonIndex(-1);
        }}
        initialSelectedIndex={selectedPersonIndex}
        onItemSelect={(_name, index) => {
          setSelectedPersonIndex(index);
        }}
      />

    </div>
  );
}
