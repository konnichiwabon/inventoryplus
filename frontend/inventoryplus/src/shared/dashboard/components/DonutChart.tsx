import React from 'react';

export interface DonutSegment {
  label: string;
  value: number;
  percentage: string;
  color: string;
}

interface DonutChartProps {
  title: string;
  total: number;
  segments: DonutSegment[];
}

export default function DonutChart({ title, total, segments }: DonutChartProps) {
  // Build the conic-gradient from the segments
  const gradientParts: string[] = [];
  let cumulative = 0;
  segments.forEach((seg) => {
    const pct = (seg.value / total) * 100;
    gradientParts.push(`${seg.color} ${cumulative}% ${cumulative + pct}%`);
    cumulative += pct;
  });
  const gradient = `conic-gradient(${gradientParts.join(', ')})`;

  return (
    <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex flex-col">
      <h3 className="text-sm font-semibold text-[#101828] dark:text-[#F5F5F6] mb-4">{title}</h3>
      <div className="flex items-center justify-center py-3">
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center"
          style={{ background: gradient }}
        >
          <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0C111D] flex items-center justify-center flex-col">
            <span className="text-lg font-bold text-[#101828] dark:text-[#F5F5F6]">{total}</span>
            <span className="text-[10px] text-[#667085] dark:text-[#94969C] uppercase font-semibold">Total</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              {seg.label}
            </span>
            <span className="text-[#101828] dark:text-[#F5F5F6]">
              {seg.value} ({seg.percentage})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
