import React from 'react';

export interface ActivityItem {
  type: 'added' | 'maintenance' | 'assigned';
  description: React.ReactNode;
  actor: string;
  timestamp: string;
}

const ICON_MAP: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  added: {
    bg: 'bg-[#ECFDF3] dark:bg-[#027A48]/10',
    color: 'text-[#12B76A]',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>,
  },
  maintenance: {
    bg: 'bg-[#FFFAEB] dark:bg-[#B54708]/10',
    color: 'text-[#F79009]',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  assigned: {
    bg: 'bg-[#F4EBFF] dark:bg-[#7F56D9]/10',
    color: 'text-[#7F56D9]',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>,
  },
};

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  { type: 'added', description: <>New asset <b>AST-1009</b> (MacBook Air M2) added</>, actor: 'Emma Johnson', timestamp: 'May 24, 2024 10:30 AM' },
  { type: 'maintenance', description: <><b>AST-1004</b> (Dell PowerEdge T150) status changed to Maintenance</>, actor: 'Liam Smith', timestamp: 'May 23, 2024 04:15 PM' },
  { type: 'assigned', description: <><b>AST-1002</b> (HP EliteDisplay E24) assigned to Liam Smith</>, actor: 'Olivia Brown', timestamp: 'May 23, 2024 11:20 AM' },
];

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export default function RecentActivity({ activities = DEFAULT_ACTIVITIES }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-[#0C111D] border border-[#EAECF0] dark:border-[#1F242F] rounded-xl p-5 shadow-sm flex flex-col">
      <h3 className="text-sm font-semibold text-[#101828] dark:text-[#F5F5F6] mb-4">Recent Activity</h3>
      <div className="flex flex-col gap-4 flex-1">
        {activities.map((activity, idx) => {
          const iconData = ICON_MAP[activity.type] || ICON_MAP.added;
          return (
            <div key={idx} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full ${iconData.bg} flex items-center justify-center ${iconData.color} shrink-0 mt-0.5`}>
                {iconData.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-[#344054] dark:text-[#CECFD2] leading-relaxed">
                  {activity.description}
                </p>
                <span className="text-[10px] text-[#667085] dark:text-[#94969C]">
                  By {activity.actor} &bull; {activity.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
