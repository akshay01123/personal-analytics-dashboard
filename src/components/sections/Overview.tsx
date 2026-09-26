import React from 'react';
import { Instagram, Linkedin, Youtube, Github } from 'lucide-react';
import { DashboardData } from '@/types';

interface OverviewProps {
  dashboardData: DashboardData;
}

const Overview: React.FC<OverviewProps> = ({ dashboardData }) => {
  const platforms = [
    {
      icon: <Instagram size={24} />,
      title: 'Instagram',
      mainMetric: 'Followers',
      mainValue: dashboardData.instagram.account1.followers.current,
      secondaryMetric: 'Posts',
      secondaryValue: dashboardData.instagram.account1.posts.current,
      change: dashboardData.instagram.account1.followers.absoluteChange,
      changePercent: dashboardData.instagram.account1.followers.percentChange,
      url: 'https://www.instagram.com/akshay0112/',
    },
    {
      icon: <Linkedin size={24} />,
      title: 'LinkedIn',
      mainMetric: 'Connections',
      mainValue: dashboardData.linkedin.connections.current,
      secondaryMetric: 'Impressions',
      secondaryValue: dashboardData.linkedin.impressions.current,
      change: dashboardData.linkedin.connections.absoluteChange,
      changePercent: dashboardData.linkedin.connections.percentChange,
      url: 'https://www.linkedin.com/in/akshay543/',
    },
    {
      icon: <Youtube size={24} />,
      title: 'YouTube',
      mainMetric: 'Subscribers',
      mainValue: dashboardData.youtube.subscribers.current,
      secondaryMetric: 'Views',
      secondaryValue: dashboardData.youtube.totalViews.current,
      change: dashboardData.youtube.subscribers.absoluteChange,
      changePercent: dashboardData.youtube.subscribers.percentChange,
      url: 'https://www.youtube.com/@akshaysrivastava5270',
    },
    {
      icon: <Github size={24} />,
      title: 'GitHub',
      mainMetric: 'Followers',
      mainValue: dashboardData.github.followers.current,
      secondaryMetric: 'Repos',
      secondaryValue: dashboardData.github.repositories.current,
      change: dashboardData.github.followers.absoluteChange,
      changePercent: dashboardData.github.followers.percentChange,
      url: 'https://github.com/akshay01123',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.title}
            className="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.open(platform.url, '_blank')}
          >
            <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
              {platform.icon}
              <h3 className="font-semibold text-gray-900 dark:text-white">{platform.title}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                  {platform.mainMetric}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {platform.mainValue.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                    {platform.secondaryMetric}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {platform.secondaryValue.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    platform.changePercent >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {platform.changePercent >= 0 ? '+' : ''}
                  {platform.changePercent.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
