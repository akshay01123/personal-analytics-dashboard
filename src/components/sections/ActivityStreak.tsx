import React from 'react';
import { Flame, Calendar } from 'lucide-react';
import { ActivitySummary } from '@/types';
import { formatDaysSince } from '@/utils/formatting';

interface ActivityStreakProps {
  activitySummary: ActivitySummary[];
  currentAccount?: 'account1' | 'account2';
}

const ActivityStreak: React.FC<ActivityStreakProps> = ({ activitySummary }) => {
  const platformLabels: Record<string, string> = {
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    github: 'GitHub',
  };

  const platformEmojis: Record<string, string> = {
    instagram: '📱',
    linkedin: '🔗',
    youtube: '▶️',
    github: '🛠️',
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity & Streaks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activitySummary.map((activity) => (
          <div key={activity.platform} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {platformLabels[activity.platform]}
                </p>
                <p className="text-3xl mt-2">{platformEmojis[activity.platform]}</p>
              </div>
              {activity.isActive && (
                <div className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded-full">
                  <Flame size={14} />
                  <span className="text-xs font-semibold">{activity.currentStreak}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {activity.currentStreak} {activity.currentStreak === 1 ? 'day' : 'days'}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-dark-700">
                <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">
                  Last Activity
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-gray-400 dark:text-gray-600" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {formatDaysSince(activity.lastActivityDate)}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-dark-700">
                <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">
                  This Week
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {activity.activityCount} {activity.activityCount === 1 ? 'activity' : 'activities'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Activity Summary */}
      <div className="mt-8 card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-dark-700 dark:to-dark-800 border-blue-200 dark:border-dark-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {activitySummary.map((activity) => (
            <div key={activity.platform} className="text-center">
              <p className="text-2xl">{platformEmojis[activity.platform]}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">
                {platformLabels[activity.platform]}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {activity.activityCount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStreak;
