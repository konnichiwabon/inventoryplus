export interface MetricItem {
  label: string;
  value: number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

import React from 'react';

const DEFAULT_METRICS: MetricItem[] = [
  {
    label: 'Total Assets', value: 248, change: '12 from last month', changeType: 'positive',
    iconBg: 'bg-[#F4EBFF] dark:bg-[#7F56D9]/10', iconColor: 'text-[#7F56D9] dark:text-[#B692F6]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>,
  },
  {
    label: 'Active Assets', value: 230, change: '8 from last month', changeType: 'positive',
    iconBg: 'bg-[#E0F2FE] dark:bg-[#0086C9]/10', iconColor: 'text-[#0086C9] dark:text-[#7CD4FD]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M12 17v4M8 21h8" /></svg>,
  },
  {
    label: 'Maintenance Due', value: 18, change: '5 from last month', changeType: 'negative',
    iconBg: 'bg-[#FEF0C7] dark:bg-[#DC6803]/10', iconColor: 'text-[#D97706] dark:text-[#FDB022]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    label: 'Retired Assets', value: 7, change: 'No change', changeType: 'neutral',
    iconBg: 'bg-[#F9F5FF] dark:bg-[#7F56D9]/10', iconColor: 'text-[#7F56D9] dark:text-[#B692F6]',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>,
  },
];

interface MetricsCardsProps {
  metrics?: MetricItem[];
}

export default function MetricsCards({ metrics = DEFAULT_METRICS }: MetricsCardsProps) {
  const changeColor = (type: string) =>
    type === 'positive' ? 'text-[#039855]' :
    type === 'negative' ? 'text-[#D92D20]' :
    'text-[#667085] dark:text-[#94969C]';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[#475467] dark:text-[#94969C]">{m.label}</span>
            <span className="text-3xl font-semibold text-[#101828] dark:text-[#F5F5F6]">{m.value}</span>
            <span className={`text-xs font-medium ${changeColor(m.changeType)} flex items-center gap-1 mt-1`}>
              {m.changeType !== 'neutral' && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 8 3-3 3 3M3 4h6"/>
                </svg>
              )}
              {m.change}
            </span>
          </div>
          <div className={`w-10 h-10 rounded-lg ${m.iconBg} flex items-center justify-center ${m.iconColor}`}>
            {m.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
