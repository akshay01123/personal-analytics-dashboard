import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { Instagram, Linkedin, Youtube, Github } from 'lucide-react';
import { TimePeriod } from '@/types';
import { mockActivitySummaryAccount1 } from '@/services/mockData';

interface ActivityStreakProps {
  dashboardData?: any;
  account: 'akshay' | 'japaneasy101';
}

const ActivityStreak: React.FC<ActivityStreakProps> = ({ account }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1m');

  const periods: { value: TimePeriod; label: string }[] = [
    { value: '7d', label: '7D' },
    { value: '1m', label: '30D' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
  ];

  const activities =
    account === 'akshay'
      ? mockActivitySummaryAccount1
      : mockActivitySummaryAccount1.slice(0, 2); // Instagram & LinkedIn only for Japaneasy

  const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram size={14} />,
    linkedin: <Linkedin size={14} />,
    youtube: <Youtube size={14} />,
    github: <Github size={14} />,
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Streaks</h3>
        <div className="inline-flex gap-1 bg-gray-100 dark:bg-dark-800 rounded-lg p-0.5">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-1.5 py-0.5 text-xs rounded font-medium transition-all ${
                selectedPeriod === period.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {activities.map((activity) => (
          <div key={activity.platform} className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-dark-800 rounded-full px-2.5 py-1.5">
            <div className="text-blue-600 dark:text-blue-400">{platformIcons[activity.platform]}</div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{activity.currentStreak}d</p>
            </div>
            {activity.isActive && <Flame size={12} className="text-orange-500" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStreak;
