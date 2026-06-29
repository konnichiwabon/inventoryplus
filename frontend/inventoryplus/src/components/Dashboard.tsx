import React, { useState, useMemo } from 'react';

// Mock assets matching the image
const INITIAL_ASSETS = [
  { tag: "AST-1001", name: "Dell Latitude 5420", category: "Laptop", status: "In Use", location: "IT Department", assignedTo: "Emma Johnson", lastUpdated: "May 24, 2024" },
  { tag: "AST-1002", name: "HP EliteDisplay E24", category: "Monitor", status: "In Use", location: "IT Department", assignedTo: "Liam Smith", lastUpdated: "May 23, 2024" },
  { tag: "AST-1003", name: "Canon imageCLASS LBP...", category: "Printer", status: "In Use", location: "Admin Office", assignedTo: "Olivia Brown", lastUpdated: "May 22, 2024" },
  { tag: "AST-1004", name: "Dell PowerEdge T150", category: "Server", status: "Maintenance", location: "Server Room", assignedTo: "Noah Williams", lastUpdated: "May 21, 2024" },
  { tag: "AST-1005", name: "Yealink T46S IP Phone", category: "Phone", status: "In Use", location: "Sales Department", assignedTo: "Ava Davis", lastUpdated: "May 20, 2024" },
  { tag: "AST-1006", name: "Epson PowerLite 2250U", category: "Projector", status: "Available", location: "Meeting Room 1", assignedTo: "James Wilson", lastUpdated: "May 19, 2024" },
  { tag: "AST-1007", name: "Logitech MK345", category: "Accessory", status: "In Use", location: "Finance Department", assignedTo: "Sophia Martinez", lastUpdated: "May 18, 2024" },
  { tag: "AST-1008", name: "Ergonomic Office Chair", category: "Furniture", status: "In Use", location: "HR Department", assignedTo: "Mason Taylor", lastUpdated: "May 17, 2024" }
];

// Mock people list for the sidebar
const PEOPLE = [
  { name: "Emma Johnson", email: "emma.johnson@example.com", initials: "EJ", color: "bg-[#E6F4EA] text-[#137333] dark:bg-[#137333]/20 dark:text-[#81C995]" },
  { name: "Liam Smith", email: "liam.smith@example.com", initials: "LS", color: "bg-[#E8F0FE] text-[#1A73E8] dark:bg-[#1A73E8]/20 dark:text-[#8AB4F8]" },
  { name: "Olivia Brown", email: "olivia.brown@example.com", initials: "OB", color: "bg-[#FEF7E0] text-[#B06000] dark:bg-[#B06000]/20 dark:text-[#FDD663]" },
  { name: "Noah Williams", email: "noah.williams@example.com", initials: "NW", color: "bg-[#F3E8FD] text-[#A142F4] dark:bg-[#A142F4]/20 dark:text-[#D7AEFB]" },
  { name: "Ava Davis", email: "ava.davis@example.com", initials: "AD", color: "bg-[#E6F4EA] text-[#137333] dark:bg-[#137333]/20 dark:text-[#81C995]" },
  { name: "James Wilson", email: "james.wilson@example.com", initials: "JW", color: "bg-[#E8F0FE] text-[#1A73E8] dark:bg-[#1A73E8]/20 dark:text-[#8AB4F8]" },
  { name: "Sophia Martinez", email: "sophia.martinez@example.com", initials: "SM", color: "bg-[#FEF7E0] text-[#B06000] dark:bg-[#B06000]/20 dark:text-[#FDD663]" },
  { name: "Mason Taylor", email: "mason.taylor@example.com", initials: "MT", color: "bg-[#F3E8FD] text-[#A142F4] dark:bg-[#A142F4]/20 dark:text-[#D7AEFB]" }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Filtering logic
  const filteredAssets = useMemo(() => {
    return INITIAL_ASSETS.filter(asset => {
      const matchesSearch = 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All Categories" || asset.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || asset.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full font-sans antialiased text-[#344054] dark:text-[#CECFD2]">
      
      {/* Left panel containing header, metrics, table, and charts */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold text-[#101828] dark:text-[#F5F5F6] tracking-[-0.6px]">
            Dashboard
          </h1>
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Assets */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[#475467] dark:text-[#94969C]">Total Assets</span>
              <span className="text-3xl font-semibold text-[#101828] dark:text-[#F5F5F6]">248</span>
              <span className="text-xs font-medium text-[#039855] flex items-center gap-1 mt-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 8 3-3 3 3M3 4h6"/>
                </svg>
                12 from last month
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#F4EBFF] dark:bg-[#7F56D9]/10 flex items-center justify-center text-[#7F56D9] dark:text-[#B692F6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            </div>
          </div>

          {/* Active Assets */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[#475467] dark:text-[#94969C]">Active Assets</span>
              <span className="text-3xl font-semibold text-[#101828] dark:text-[#F5F5F6]">230</span>
              <span className="text-xs font-medium text-[#039855] flex items-center gap-1 mt-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 8 3-3 3 3M3 4h6"/>
                </svg>
                8 from last month
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] dark:bg-[#0086C9]/10 flex items-center justify-center text-[#0086C9] dark:text-[#7CD4FD]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <path d="M12 17v4M8 21h8" />
              </svg>
            </div>
          </div>

          {/* Maintenance Due */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[#475467] dark:text-[#94969C]">Maintenance Due</span>
              <span className="text-3xl font-semibold text-[#101828] dark:text-[#F5F5F6]">18</span>
              <span className="text-xs font-medium text-[#D92D20] flex items-center gap-1 mt-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 8 3-3 3 3M3 4h6"/>
                </svg>
                5 from last month
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FEF0C7] dark:bg-[#DC6803]/10 flex items-center justify-center text-[#D97706] dark:text-[#FDB022]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
          </div>

          {/* Retired Assets */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[#475467] dark:text-[#94969C]">Retired Assets</span>
              <span className="text-3xl font-semibold text-[#101828] dark:text-[#F5F5F6]">7</span>
              <span className="text-xs font-medium text-[#667085] dark:text-[#94969C] flex items-center gap-1 mt-1">
                No change
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#F9F5FF] dark:bg-[#7F56D9]/10 flex items-center justify-center text-[#7F56D9] dark:text-[#B692F6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Assets Section Container */}
        <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Header block with search, filters, and Add Asset button */}
          <div className="p-5 border-b border-[#EAECF0] dark:border-[#1F242F] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#101828] dark:text-[#F5F5F6]">Assets</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3] dark:text-[#85888E] pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  className="h-10 pl-9 pr-3 border border-[#D0D5DD] dark:border-[#333741] rounded-lg bg-white dark:bg-[#161B26] text-sm text-[#101828] dark:text-[#F5F5F6] outline-none transition-all duration-150 focus:border-[#D6BBFB] focus:ring-4 focus:ring-[#F4EBFF] dark:focus:ring-[rgba(127,86,217,0.15)] placeholder:text-[#98A2B3]"
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                className="h-10 px-3 border border-[#D0D5DD] dark:border-[#333741] rounded-lg bg-white dark:bg-[#161B26] text-sm text-[#344054] dark:text-[#CECFD2] outline-none cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All Categories">All Categories</option>
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Printer">Printer</option>
                <option value="Server">Server</option>
                <option value="Phone">Phone</option>
                <option value="Projector">Projector</option>
                <option value="Accessory">Accessory</option>
                <option value="Furniture">Furniture</option>
              </select>

              {/* Status Filter */}
              <select
                className="h-10 px-3 border border-[#D0D5DD] dark:border-[#333741] rounded-lg bg-white dark:bg-[#161B26] text-sm text-[#344054] dark:text-[#CECFD2] outline-none cursor-pointer"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Available">Available</option>
                <option value="Retired">Retired</option>
              </select>

              {/* Add Asset Button */}
              <button className="h-10 px-4 bg-[#1B4332] hover:bg-[#1B4332]/90 text-white rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-150 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5v14"/>
                </svg>
                Add Asset
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] dark:bg-[#161B26]/50 border-b border-[#EAECF0] dark:border-[#1F242F]">
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Asset Tag</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Asset Name</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Category</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Location</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Assigned To</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C]">Last Updated</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-[#475467] dark:text-[#94969C] w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1F242F]">
                {filteredAssets.map((asset) => (
                  <tr key={asset.tag} className="hover:bg-[#F9FAFB] dark:hover:bg-[#161B26]/30 transition-colors duration-100">
                    <td className="px-6 py-4 text-sm font-semibold text-[#101828] dark:text-[#F5F5F6]">{asset.tag}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#101828] dark:text-[#F5F5F6]">{asset.name}</td>
                    <td className="px-6 py-4 text-sm text-[#475467] dark:text-[#94969C]">{asset.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        asset.status === 'In Use' ? 'bg-[#ECFDF3] text-[#027A48] dark:bg-[#027A48]/10 dark:text-[#34C759]' :
                        asset.status === 'Maintenance' ? 'bg-[#FFFAEB] text-[#B54708] dark:bg-[#B54708]/10 dark:text-[#FDB022]' :
                        asset.status === 'Available' ? 'bg-[#EFF8FF] text-[#175CD3] dark:bg-[#175CD3]/10 dark:text-[#53B1FD]' :
                        'bg-[#F2F4F7] text-[#344054] dark:bg-[#344054]/10 dark:text-[#94969C]'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#475467] dark:text-[#94969C]">{asset.location}</td>
                    <td className="px-6 py-4 text-sm text-[#475467] dark:text-[#94969C]">{asset.assignedTo}</td>
                    <td className="px-6 py-4 text-sm text-[#475467] dark:text-[#94969C]">{asset.lastUpdated}</td>
                    <td className="px-6 py-4 text-sm w-10 text-right">
                      <button className="text-[#98A2B3] dark:text-[#85888E] hover:text-[#475467] dark:hover:text-[#F5F5F6] cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredAssets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-[#98A2B3]">
                      No assets found matching the filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 border-t border-[#EAECF0] dark:border-[#1F242F] flex items-center justify-between">
            <span className="text-xs text-[#475467] dark:text-[#94969C]">
              Showing 1 to {filteredAssets.length} of 248 assets
            </span>
            <div className="flex items-center gap-1.5">
              <button className="p-1 px-2.5 border border-[#D0D5DD] dark:border-[#333741] rounded-lg text-xs font-semibold bg-white dark:bg-[#161B26] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] cursor-pointer">
                Previous
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-[#1B4332] text-white flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-white dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] flex items-center justify-center cursor-pointer">
                2
              </button>
              <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-white dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] flex items-center justify-center cursor-pointer">
                3
              </button>
              <span className="text-xs text-[#98A2B3]">...</span>
              <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-white dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] flex items-center justify-center cursor-pointer">
                31
              </button>
              <button className="p-1 px-2.5 border border-[#D0D5DD] dark:border-[#333741] rounded-lg text-xs font-semibold bg-white dark:bg-[#161B26] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Bottom charts & recent activity row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Chart 1: Assets by Category */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex flex-col">
            <h3 className="text-sm font-semibold text-[#101828] dark:text-[#F5F5F6] mb-4">Assets by Category</h3>
            <div className="flex items-center justify-center py-3">
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center" style={{
                background: 'conic-gradient(#12B76A 0% 41.9%, #3B82F6 41.9% 61.3%, #F79009 61.3% 72.6%, #7F56D9 72.6% 82.3%, #98A2B3 82.3% 100%)'
              }}>
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0C111D] flex items-center justify-center flex-col">
                  <span className="text-lg font-bold text-[#101828] dark:text-[#F5F5F6]">248</span>
                  <span className="text-[10px] text-[#667085] dark:text-[#94969C] uppercase font-semibold">Total</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#12B76A]" />Laptop</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">104 (41.9%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#3B82F6]" />Monitor</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">48 (19.4%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F79009]" />Server</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">28 (11.3%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#7F56D9]" />Printer</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">24 (9.7%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#98A2B3]" />Others</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">44 (17.7%)</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Assets by Status */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex flex-col">
            <h3 className="text-sm font-semibold text-[#101828] dark:text-[#F5F5F6] mb-4">Assets by Status</h3>
            <div className="flex items-center justify-center py-3">
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center" style={{
                background: 'conic-gradient(#12B76A 0% 92.7%, #3B82F6 92.7% 97.5%, #F79009 97.5% 100%)'
              }}>
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0C111D] flex items-center justify-center flex-col">
                  <span className="text-lg font-bold text-[#101828] dark:text-[#F5F5F6]">248</span>
                  <span className="text-[10px] text-[#667085] dark:text-[#94969C] uppercase font-semibold">Total</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#12B76A]" />In Use</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">230 (92.7%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#3B82F6]" />Available</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">12 (4.8%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F79009]" />Maintenance</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">18 (2.5%)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#98A2B3]" />Retired</span>
                <span className="text-[#101828] dark:text-[#F5F5F6]">7 (2.0%)</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex flex-col">
            <h3 className="text-sm font-semibold text-[#101828] dark:text-[#F5F5F6] mb-4">Recent Activity</h3>
            <div className="flex flex-col gap-4 flex-1">
              {/* Activity 1 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ECFDF3] dark:bg-[#027A48]/10 flex items-center justify-center text-[#12B76A] shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5v14"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-[#344054] dark:text-[#CECFD2] leading-relaxed">
                    New asset <b>AST-1009</b> (MacBook Air M2) added
                  </p>
                  <span className="text-[10px] text-[#667085] dark:text-[#94969C]">
                    By Emma Johnson &bull; May 24, 2024 10:30 AM
                  </span>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFFAEB] dark:bg-[#B54708]/10 flex items-center justify-center text-[#F79009] shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-[#344054] dark:text-[#CECFD2] leading-relaxed">
                    <b>AST-1004</b> (Dell PowerEdge T150) status changed to Maintenance
                  </p>
                  <span className="text-[10px] text-[#667085] dark:text-[#94969C]">
                    By Liam Smith &bull; May 23, 2024 04:15 PM
                  </span>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F4EBFF] dark:bg-[#7F56D9]/10 flex items-center justify-center text-[#7F56D9] shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-[#344054] dark:text-[#CECFD2] leading-relaxed">
                    <b>AST-1002</b> (HP EliteDisplay E24) assigned to Liam Smith
                  </p>
                  <span className="text-[10px] text-[#667085] dark:text-[#94969C]">
                    By Olivia Brown &bull; May 23, 2024 11:20 AM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Sidebar ("People") */}
      <div className="w-full lg:w-[280px] bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl shadow-sm flex flex-col shrink-0 p-5">
        <div className="flex items-center gap-2 mb-5">
          <svg className="text-[#475467] dark:text-[#94969C]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <h2 className="text-lg font-bold text-[#101828] dark:text-[#F5F5F6]">People</h2>
        </div>

        {/* People List */}
        <div className="flex flex-col gap-2 flex-1">
          {PEOPLE.map((person) => (
            <div key={person.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#161B26]/30 transition-colors duration-100 cursor-pointer">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${person.color} shrink-0`}>
                {person.initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-[#101828] dark:text-[#F5F5F6] truncate">{person.name}</span>
                <span className="text-xs text-[#667085] dark:text-[#94969C] truncate">{person.email}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View all people footer button */}
        <button className="w-full mt-6 py-2.5 border border-[#D0D5DD] dark:border-[#333741] rounded-lg text-xs font-semibold bg-white dark:bg-[#161B26] hover:bg-[#F9FAFB] dark:hover:bg-[#1F242F] flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 shadow-sm text-[#344054] dark:text-[#CECFD2]">
          View all people
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" x2="19" y1="12" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

    </div>
  );
}
