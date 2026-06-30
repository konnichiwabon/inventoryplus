import React, { useState, useMemo } from 'react';

// ─── Types ───────────────────────────────────────────────────────
export interface Asset {
  tag: string;
  name: string;
  category: string;
  status: 'In Use' | 'Maintenance' | 'Available' | 'Retired';
  location: string;
  assignedTo: string;
  lastUpdated: string;
}

interface AssetsTableProps {
  assets: Asset[];
  onAddAsset?: () => void;
  onEditAsset?: (asset: Asset) => void;
  onDeleteAsset?: (asset: Asset) => void;
  onReassignAsset?: (asset: Asset) => void;
  onRowClick?: (asset: Asset) => void;
}

// ─── Constants ───────────────────────────────────────────────────
const CATEGORIES = ['All Categories', 'Laptop', 'Monitor', 'Printer', 'Server', 'Phone', 'Projector', 'Accessory', 'Furniture'];
const STATUSES = ['All Status', 'In Use', 'Maintenance', 'Available', 'Retired'];
const PAGE_SIZE = 8;

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  'In Use':       { backgroundColor: '#ECFDF3', color: '#027A48' },
  'Maintenance':  { backgroundColor: '#FFFAEB', color: '#B54708' },
  'Available':    { backgroundColor: '#EFF8FF', color: '#175CD3' },
  'Retired':      { backgroundColor: '#F2F4F7', color: '#344054' },
};

const CATEGORY_ICONS: Record<string, string> = {
  Laptop:    '💻', Monitor:   '🖥️', Printer:   '🖨️', Server:    '🗄️',
  Phone:     '📞', Projector: '📽️', Accessory: '⌨️', Furniture: '🪑',
};

// ─── Component ───────────────────────────────────────────────────
export default function AssetsTable({
  assets,
  onAddAsset,
  onEditAsset,
  onDeleteAsset,
  onReassignAsset,
  onRowClick,
}: AssetsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuTag, setOpenMenuTag] = useState<string | null>(null);

  // ── Filtering ──
  const filteredAssets = useMemo(() => {
    return assets.filter(a => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = a.name.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q) || a.assignedTo.toLowerCase().includes(q);
      const matchesCat = selectedCategory === 'All Categories' || a.category === selectedCategory;
      const matchesStat = selectedStatus === 'All Status' || a.status === selectedStatus;
      return matchesSearch && matchesCat && matchesStat;
    });
  }, [assets, searchQuery, selectedCategory, selectedStatus]);

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / PAGE_SIZE));
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (v: string) => void) => (v: string) => { setter(v); setCurrentPage(1); };

  // ── Three-dot menu ──
  const toggleMenu = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuTag(prev => prev === tag ? null : tag);
  };

  const handleMenuAction = (action: string, asset: Asset) => {
    setOpenMenuTag(null);
    if (action === 'edit' && onEditAsset) onEditAsset(asset);
    if (action === 'delete' && onDeleteAsset) onDeleteAsset(asset);
    if (action === 'reassign' && onReassignAsset) onReassignAsset(asset);
  };

  // ── Pagination buttons ──
  const renderPageButtons = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push('...');
      if (currentPage > 3 && currentPage < totalPages - 1) pages.push(currentPage);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div style={{ backgroundColor: 'var(--card-bg, #fff)', border: '1px solid var(--border, #EAECF0)', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Header: Title + Search + Filters + Add Button ── */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border, #EAECF0)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-h, #101828)', margin: 0 }}>Assets</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#98A2B3' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              style={{ height: 40, paddingLeft: 36, paddingRight: 12, border: '1px solid var(--border, #D0D5DD)', borderRadius: 8, backgroundColor: 'var(--input-bg, #fff)', fontSize: 14, color: 'var(--text-h, #101828)', outline: 'none', minWidth: 180 }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => handleFilterChange(setSelectedCategory)(e.target.value)}
            style={{ height: 40, padding: '0 12px', border: '1px solid var(--border, #D0D5DD)', borderRadius: 8, backgroundColor: 'var(--input-bg, #fff)', fontSize: 14, color: 'var(--text, #344054)', cursor: 'pointer', outline: 'none' }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => handleFilterChange(setSelectedStatus)(e.target.value)}
            style={{ height: 40, padding: '0 12px', border: '1px solid var(--border, #D0D5DD)', borderRadius: 8, backgroundColor: 'var(--input-bg, #fff)', fontSize: 14, color: 'var(--text, #344054)', cursor: 'pointer', outline: 'none' }}
          >
            {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
          </select>

          {/* Add Asset Button */}
          <button
            onClick={onAddAsset}
            style={{ height: 40, padding: '0 16px', backgroundColor: '#1B4332', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5v14" />
            </svg>
            Add Asset
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--table-header-bg, #F9FAFB)', borderBottom: '1px solid var(--border, #EAECF0)' }}>
              {['Asset Tag', 'Asset Name', 'Category', 'Status', 'Location', 'Assigned To', 'Last Updated', ''].map((col, i) => (
                <th key={i} style={{ padding: '14px 24px', fontSize: 12, fontWeight: 600, color: '#475467', whiteSpace: 'nowrap', ...(col === '' ? { width: 40 } : {}) }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map(asset => (
              <tr
                key={asset.tag}
                onClick={() => onRowClick?.(asset)}
                style={{ borderBottom: '1px solid var(--border, #EAECF0)', cursor: onRowClick ? 'pointer' : 'default', transition: 'background-color 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--table-hover-bg, #F9FAFB)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Asset Tag */}
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: 'var(--text-h, #101828)', whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{CATEGORY_ICONS[asset.category] || '📦'}</span>
                    {asset.tag}
                  </span>
                </td>

                {/* Asset Name */}
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 500, color: 'var(--text-h, #101828)' }}>{asset.name}</td>

                {/* Category */}
                <td style={{ padding: '16px 24px', fontSize: 14, color: '#475467' }}>{asset.category}</td>

                {/* Status Badge */}
                <td style={{ padding: '16px 24px', fontSize: 14 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500, ...(STATUS_STYLES[asset.status] || {}) }}>
                    {asset.status}
                  </span>
                </td>

                {/* Location */}
                <td style={{ padding: '16px 24px', fontSize: 14, color: '#475467' }}>{asset.location}</td>

                {/* Assigned To */}
                <td style={{ padding: '16px 24px', fontSize: 14, color: '#475467' }}>{asset.assignedTo}</td>

                {/* Last Updated */}
                <td style={{ padding: '16px 24px', fontSize: 14, color: '#475467', whiteSpace: 'nowrap' }}>{asset.lastUpdated}</td>

                {/* Three-dot menu */}
                <td style={{ padding: '16px 24px', width: 40, textAlign: 'right', position: 'relative' }}>
                  <button
                    onClick={e => toggleMenu(asset.tag, e)}
                    style={{ background: 'none', border: 'none', color: '#98A2B3', cursor: 'pointer', padding: 4 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuTag === asset.tag && (
                    <div
                      style={{ position: 'absolute', right: 24, top: '100%', zIndex: 50, minWidth: 140, backgroundColor: 'var(--card-bg, #fff)', border: '1px solid var(--border, #EAECF0)', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: 4 }}
                      onClick={e => e.stopPropagation()}
                    >
                      {[
                        { label: 'Edit', action: 'edit', color: '#344054' },
                        { label: 'Reassign', action: 'reassign', color: '#344054' },
                        { label: 'Delete', action: 'delete', color: '#D92D20' },
                      ].map(item => (
                        <button
                          key={item.action}
                          onClick={() => handleMenuAction(item.action, asset)}
                          style={{ width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', fontSize: 13, fontWeight: 500, color: item.color, cursor: 'pointer', borderRadius: 6, display: 'block' }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--table-hover-bg, #F9FAFB)')}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {paginatedAssets.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '40px 24px', textAlign: 'center', fontSize: 14, color: '#98A2B3' }}>
                  No assets found matching the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer: Count + Pagination ── */}
      <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border, #EAECF0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: '#475467' }}>
          Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filteredAssets.length)} to {Math.min(currentPage * PAGE_SIZE, filteredAssets.length)} of {filteredAssets.length} assets
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            style={{ padding: '4px 10px', border: '1px solid var(--border, #D0D5DD)', borderRadius: 8, fontSize: 12, fontWeight: 600, backgroundColor: 'var(--card-bg, #fff)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            &lt;
          </button>

          {/* Page numbers */}
          {renderPageButtons().map((p, i) =>
            typeof p === 'string' ? (
              <span key={`e${i}`} style={{ fontSize: 12, color: '#98A2B3', padding: '0 2px' }}>{p}</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{ width: 32, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, border: p === currentPage ? 'none' : '1px solid var(--border, #D0D5DD)', backgroundColor: p === currentPage ? '#1B4332' : 'var(--card-bg, #fff)', color: p === currentPage ? '#fff' : 'var(--text, #344054)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            style={{ padding: '4px 10px', border: '1px solid var(--border, #D0D5DD)', borderRadius: 8, fontSize: 12, fontWeight: 600, backgroundColor: 'var(--card-bg, #fff)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
