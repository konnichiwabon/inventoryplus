import React from 'react';

export interface InfoItem {
  label: string;
  value: React.ReactNode;
}

export type CardVariant = 'green' | 'orange' | 'blue' | 'beige';

export interface InfoCardProps {
  title: string;
  icon: any;
  variant: CardVariant;
  items: InfoItem[] | InfoItem[][];
  className?: string;
  onEdit?: () => void;
}

const variantStyles = {
  green: {
    headerBg: 'bg-[#EAF2D7] dark:bg-[#192D1F]',
    titleText: 'text-[#2D3A1B] dark:text-[#8AD2A3]',
    iconWrapper: 'bg-white dark:bg-[#111D15] dark:border dark:border-[#192D1F] text-[#4D6331] dark:text-[#4CAF50]',
    decorText: 'text-[#DAE8BE] dark:text-[#1B3523]',
  },
  orange: {
    headerBg: 'bg-[#FCE6D8] dark:bg-[#3B2114]',
    titleText: 'text-[#5C3218] dark:text-[#F8B28B]',
    iconWrapper: 'bg-white dark:bg-[#28140B] dark:border dark:border-[#3B2114] text-[#B25A24] dark:text-[#FF9800]',
    decorText: 'text-[#F8CCA9] dark:text-[#4C2B1B]',
  },
  blue: {
    headerBg: 'bg-[#E0E8F0] dark:bg-[#132435]',
    titleText: 'text-[#1F364D] dark:text-[#92C2EC]',
    iconWrapper: 'bg-white dark:bg-[#0B1622] dark:border dark:border-[#132435] text-[#386087] dark:text-[#2196F3]',
    decorText: 'text-[#C2D1E0] dark:text-[#1B3147]',
  },
  beige: {
    headerBg: 'bg-[#F4F1E6] dark:bg-[#24221A]',
    titleText: 'text-[#3E3B30] dark:text-[#E2DCC2]',
    iconWrapper: 'bg-white dark:bg-[#1A1813] dark:border dark:border-[#24221A] text-[#7A745E] dark:text-[#D4AF37]',
    decorText: 'text-[#E6DFCD] dark:text-[#333026]',
  },
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  variant,
  items,
  className = '',
  onEdit,
}) => {
  const styles = variantStyles[variant];
  const [activeTabIdx, setActiveTabIdx] = React.useState(0);

  const isMultiInstance = items.length > 0 && Array.isArray(items[0]);
  const safeActiveIndex = isMultiInstance
    ? Math.max(0, Math.min(activeTabIdx, (items as InfoItem[][]).length - 1))
    : 0;

  const currentItems = isMultiInstance
    ? (items as InfoItem[][])[safeActiveIndex] || []
    : (items as InfoItem[]);

  const getTabLabel = (itemGroup: InfoItem[], index: number, cardTitle: string): string => {
    const titleLower = cardTitle.toLowerCase();
    
    if (titleLower.includes('monitor')) {
      return `Monitor ${index + 1}`;
    }

    const searchTerms = titleLower.includes('ram')
      ? ['slot']
      : ['slot', 'type', 'model', 'brand'];

    const slotItem = itemGroup.find(item =>
      searchTerms.some(term => item.label.toLowerCase().includes(term))
    );
    if (slotItem && typeof slotItem.value === 'string' && slotItem.value.trim()) {
      return slotItem.value.trim();
    }

    if (titleLower.includes('ram')) return `Stick ${index + 1}`;
    if (titleLower.includes('storage')) return `Drive ${index + 1}`;
    if (titleLower.includes('gpu')) return `GPU ${index + 1}`;
    if (titleLower.includes('peripheral')) return `Device ${index + 1}`;
    return `Item ${index + 1}`;
  };

  return (
    <div className={`relative bg-[var(--bg)] border border-[var(--border)] rounded-[20px] overflow-hidden shadow-[var(--shadow)] flex flex-col h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] ${className}`}>
      {/* Header */}
      <div className={`flex items-center justify-between gap-3 px-5 py-4 ${styles.headerBg}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-[0_1px_2px_rgba(16,24,40,0.05)] shrink-0 ${styles.iconWrapper}`}>
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              {icon}
            </div>
          </div>
          <h3 className={`text-base font-bold m-0 ${styles.titleText}`}>{title}</h3>
        </div>
        {onEdit && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className={`flex items-center justify-center p-1.5 rounded-lg border border-transparent transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 ${styles.titleText}`}
            title="Edit specs"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ strokeWidth: 2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col gap-3 grow z-10">
        {isMultiInstance && (
          <div className="flex flex-wrap gap-1.5 pb-3 border-b border-[var(--border)] mb-2">
            {(items as InfoItem[][]).map((group, idx) => {
              const label = getTabLabel(group, idx, title);
              const isActive = idx === safeActiveIndex;
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTabIdx(idx);
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive
                      ? `shadow-sm ${
                          variant === 'green' ? 'bg-[#EAF2D7] dark:bg-[#192D1F] text-[#4D6331] dark:text-[#8AD2A3] border border-[#2D3A1B]/20 dark:border-[#8AD2A3]/30' :
                          variant === 'orange' ? 'bg-[#FCE6D8] dark:bg-[#3B2114] text-[#B25A24] dark:text-[#F8B28B] border border-[#5C3218]/20 dark:border-[#F8B28B]/30' :
                          variant === 'blue' ? 'bg-[#E0E8F0] dark:bg-[#132435] text-[#386087] dark:text-[#92C2EC] border border-[#1F364D]/20 dark:border-[#92C2EC]/30' :
                          'bg-[#F4F1E6] dark:bg-[#24221A] text-[#7A745E] dark:text-[#E2DCC2] border border-[#3E3B30]/20 dark:border-[#E2DCC2]/30'
                        }`
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {currentItems.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[140px_1fr] gap-4 items-center">
            <span className="text-[13px] font-semibold text-[var(--text)]">{item.label}</span>
            <span className="text-[13px] font-semibold text-[var(--text-h)] break-all">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Decorative Corner SVG */}
      <div className={`absolute bottom-0 right-0 w-[100px] h-[100px] pointer-events-none z-0 ${styles.decorText}`}>
        <svg viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-full">
          <path d="M 100,30 C 85,55 60,85 30,100 L 100,100 Z" />
        </svg>
      </div>
    </div>
  );
};

export default InfoCard;
