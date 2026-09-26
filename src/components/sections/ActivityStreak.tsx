import React from 'react';
import { Instagram, Linkedin, Youtube, Github } from 'lucide-react';
import { mockActivitySummaryAccount1 } from '@/services/mockData';

interface ActivityStreakProps {
  dashboardData?: any;
  account: 'akshay' | 'japaneasy101' | null;
}

const ActivityStreak: React.FC<ActivityStreakProps> = ({ account }) => {
  const activities =
    account === null
      ? mockActivitySummaryAccount1 // Combined
      : account === 'akshay'
        ? mockActivitySummaryAccount1
        : mockActivitySummaryAccount1.slice(0, 2); // Instagram & LinkedIn only

  const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram size={16} />,
    linkedin: <Linkedin size={16} />,
    youtube: <Youtube size={16} />,
    github: <Github size={16} />,
  };

  // Time periods with multipliers
  const timePeriods = [
    { label: '7D', multiplier: 1 },
    { label: '30D', multiplier: 4.3 },
    { label: '3M', multiplier: 12.9 },
    { label: '6M', multiplier: 25.7 },
    { label: '1Y', multiplier: 51.4 },
  ];

  return (
    <div className="mt-3">
      <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase mb-2">Activity Streaks</h3>
      <div className="space-y-2.5">
        {activities.map((activity) => (
          <div key={activity.platform} className="card p-2">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="text-blue-600 dark:text-blue-400">{platformIcons[activity.platform]}</div>
              <h4 className="text-xs font-semibold text-gray-900 dark:text-white capitalize">
                {activity.platform}
              </h4>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {timePeriods.map((period) => {
                const streakForPeriod = Math.max(1, Math.floor(activity.currentStreak * period.multiplier));
                const percentChange = ((streakForPeriod - activity.currentStreak) / activity.currentStreak) * 100;

                return (
                  <div key={period.label} className="bg-gray-100 dark:bg-dark-800 rounded p-1.5 text-center">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{streakForPeriod}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">{period.label}</p>
                    <p
                      className={`text-xs font-semibold ${
                        percentChange >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(0)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStreak;
