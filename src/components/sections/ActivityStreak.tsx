import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { Instagram, Linkedin, Youtube, Github } from 'lucide-react';
import { ActivitySummary, TimePeriod } from '@/types';
import { mockActivitySummaryAccount1 } from '@/services/mockData';

interface ActivityStreakProps {
  dashboardData?: any;
}

const ActivityStreak: React.FC<ActivityStreakProps> = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1m');

  const periods: { value: TimePeriod; label: string; days: number }[] = [
    { value: '7d', label: '7D', days: 7 },
    { value: '1m', label: '30D', days: 30 },
    { value: '3m', label: '3M', days: 90 },
    { value: '6m', label: '6M', days: 180 },
  ];

  // Adjust activity data based on period
  const getActivityForPeriod = (activity: ActivitySummary, period: TimePeriod): ActivitySummary => {
    const multipliers: Record<TimePeriod, number> = {
      '7d': 1,
      '1m': 4.3,
      '3m': 12.9,
      '6m': 25.7,
    };
    return {
      ...activity,
      currentStreak: Math.max(1, Math.floor(activity.currentStreak * (multipliers[period] || 1))),
      activityCount: Math.floor(activity.activityCount * (multipliers[period] || 1)),
    };
  };

  const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram size={20} />,
    linkedin: <Linkedin size={20} />,
    youtube: <Youtube size={20} />,
    github: <Github size={20} />,
  };

  const activities = mockActivitySummaryAccount1.map((a) => getActivityForPeriod(a, selectedPeriod));

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activity Streaks</h2>
        <div className="inline-flex gap-2 bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-3 py-1 text-sm rounded font-medium transition-all ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div key={activity.platform} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                {platformIcons[activity.platform]}
              </div>
              {activity.isActive && (
                <div className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                  <Flame size={12} />
                  {activity.currentStreak}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Streak</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {activity.currentStreak} day{activity.currentStreak !== 1 ? 's' : ''}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">This Period</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{activity.activityCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStreak;
