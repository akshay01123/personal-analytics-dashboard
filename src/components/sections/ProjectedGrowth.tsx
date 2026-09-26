import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { DashboardData } from '@/types';
import { formatNumber, estimateFutureValue } from '@/utils/formatting';

interface ProjectedGrowthProps {
  dashboardData: DashboardData;
}

interface ProjectionItem {
  label: string;
  platform: string;
  emoji: string;
  current: number;
  projected: number;
  percentIncrease: number;
  timeframe: string;
}

const ProjectedGrowth: React.FC<ProjectedGrowthProps> = ({ dashboardData }) => {
  // Helper to create projections for an account
  const createProjections = (account: 'account1' | 'account2' | 'combined'): ProjectionItem[] => {
    const igData =
      account === 'combined'
        ? dashboardData.instagram.combined.totalFollowers
        : account === 'account1'
          ? dashboardData.instagram.account1.followers
          : dashboardData.instagram.account2.followers;

    const igProjections: ProjectionItem[] = [
      {
        label: 'Instagram Followers',
        platform: 'instagram',
        emoji: '📱',
        current: igData.current,
        projected: estimateFutureValue(igData.current, [igData.previous, igData.current], 30),
        percentIncrease: 0,
        timeframe: '~1 month',
      },
      {
        label: 'LinkedIn Connections',
        platform: 'linkedin',
        emoji: '🔗',
        current: dashboardData.linkedin.connections.current,
        projected: estimateFutureValue(
          dashboardData.linkedin.connections.current,
          [dashboardData.linkedin.connections.previous, dashboardData.linkedin.connections.current],
          30
        ),
        percentIncrease: 0,
        timeframe: '~1 month',
      },
    ];

    // Add YouTube and GitHub only for account1 and combined
    if (account !== 'account2') {
      igProjections.push(
        {
          label: 'YouTube Subscribers',
          platform: 'youtube',
          emoji: '▶️',
          current: dashboardData.youtube.subscribers.current,
          projected: estimateFutureValue(
            dashboardData.youtube.subscribers.current,
            [dashboardData.youtube.subscribers.previous, dashboardData.youtube.subscribers.current],
            30
          ),
          percentIncrease: 0,
          timeframe: '~1 month',
        },
        {
          label: 'GitHub Followers',
          platform: 'github',
          emoji: '🛠️',
          current: dashboardData.github.followers.current,
          projected: estimateFutureValue(
            dashboardData.github.followers.current,
            [dashboardData.github.followers.previous, dashboardData.github.followers.current],
            30
          ),
          percentIncrease: 0,
          timeframe: '~1 month',
        }
      );
    }

    igProjections.forEach((p) => {
      p.percentIncrease = ((p.projected - p.current) / p.current) * 100;
    });

    return igProjections;
  };

  const ProjectionCard: React.FC<{ projection: ProjectionItem }> = ({ projection }) => (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{projection.emoji}</span>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{projection.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{projection.timeframe}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <TrendingUp size={16} />
          <span className="text-xs font-semibold">+{projection.percentIncrease.toFixed(1)}%</span>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-dark-900 rounded-lg p-3 space-y-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">Current</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {formatNumber(projection.current)}
          </p>
        </div>

        <div className="flex items-center justify-center text-gray-400 dark:text-gray-600">
          <div className="h-px bg-gray-300 dark:bg-dark-700 flex-1"></div>
          <span className="px-2 text-xs">→</span>
          <div className="h-px bg-gray-300 dark:bg-dark-700 flex-1"></div>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">Projected</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            ~{formatNumber(projection.projected)}
          </p>
        </div>
      </div>
    </div>
  );

  const AccountProjectionSection: React.FC<{ title: string; account: 'account1' | 'account2' | 'combined' }> = ({
    title,
    account,
  }) => {
    const projections = createProjections(account);
    return (
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className={`grid gap-4 ${account === 'account2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
          {projections.map((projection) => (
            <ProjectionCard key={projection.platform} projection={projection} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projected Growth</h2>
        <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-sm">
          <AlertCircle size={16} />
          <span className="text-xs">Estimates based on trends</span>
        </div>
      </div>

      {/* Combined Section */}
      <AccountProjectionSection title="📊 Combined" account="combined" />

      {/* Akshay Section */}
      <AccountProjectionSection title="👤 Akshay (Account 1)" account="account1" />

      {/* Japaneasy101 Section */}
      <AccountProjectionSection title="🏢 Japaneasy101 (Account 2)" account="account2" />

      {/* Methodology Section */}
      <div className="card p-6 bg-blue-50 dark:bg-dark-700 border-blue-200 dark:border-dark-600">
        <div className="flex gap-4">
          <AlertCircle className="flex-shrink-0 text-blue-600 dark:text-blue-400" size={20} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              How are projections calculated?
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                • Projections use <strong>linear regression</strong> based on your recent growth rate
              </li>
              <li>
                • The model assumes your growth rate remains <strong>consistent</strong> over the next
                month
              </li>
              <li>
                • Actual results may vary based on posting frequency, content quality, and external
                factors
              </li>
              <li>
                • Projections are updated regularly as new data becomes available
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectedGrowth;
