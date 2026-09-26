import React from 'react';
import { Instagram, Linkedin, Youtube, Github } from 'lucide-react';
import { DashboardData } from '@/types';

interface OverviewProps {
  dashboardData: DashboardData;
  account: 'akshay' | 'japaneasy101' | null;
}

const Overview: React.FC<OverviewProps> = ({ dashboardData, account }) => {
  const getPlatforms = () => {
    if (account === null) {
      // Combined/Overview view - show all 4
      return [
        {
          icon: <Instagram size={16} />,
          title: 'Instagram (Combined)',
          value: dashboardData.instagram.combined.totalFollowers.current,
          change: dashboardData.instagram.combined.totalFollowers.percentChange,
        },
        {
          icon: <Linkedin size={16} />,
          title: 'LinkedIn',
          value: dashboardData.linkedin.connections.current,
          change: dashboardData.linkedin.connections.percentChange,
        },
        {
          icon: <Youtube size={16} />,
          title: 'YouTube',
          value: dashboardData.youtube.subscribers.current,
          change: dashboardData.youtube.subscribers.percentChange,
        },
        {
          icon: <Github size={16} />,
          title: 'GitHub',
          value: dashboardData.github.followers.current,
          change: dashboardData.github.followers.percentChange,
        },
      ];
    } else if (account === 'akshay') {
      return [
        {
          icon: <Instagram size={16} />,
          title: 'Instagram',
          value: dashboardData.instagram.account1.followers.current,
          change: dashboardData.instagram.account1.followers.percentChange,
        },
        {
          icon: <Linkedin size={16} />,
          title: 'LinkedIn',
          value: dashboardData.linkedin.connections.current,
          change: dashboardData.linkedin.connections.percentChange,
        },
        {
          icon: <Youtube size={16} />,
          title: 'YouTube',
          value: dashboardData.youtube.subscribers.current,
          change: dashboardData.youtube.subscribers.percentChange,
        },
        {
          icon: <Github size={16} />,
          title: 'GitHub',
          value: dashboardData.github.followers.current,
          change: dashboardData.github.followers.percentChange,
        },
      ];
    } else {
      // Japaneasy101 - only Instagram and LinkedIn
      return [
        {
          icon: <Instagram size={16} />,
          title: 'Instagram',
          value: dashboardData.instagram.account2.followers.current,
          change: dashboardData.instagram.account2.followers.percentChange,
        },
        {
          icon: <Linkedin size={16} />,
          title: 'LinkedIn',
          value: 850,
          change: 2.3,
        },
      ];
    }
  };

  const platforms = getPlatforms();

  return (
    <div className={`grid gap-2 ${account === 'akshay' || account === null ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
      {platforms.map((p) => (
        <div key={p.title} className="card p-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="text-blue-600 dark:text-blue-400">{p.icon}</div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white truncate">{p.title}</h4>
          </div>
          <p className="text-base font-bold text-gray-900 dark:text-white">{p.value.toLocaleString()}</p>
          <p
            className={`text-xs font-semibold ${
              p.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {p.change >= 0 ? '+' : ''}{p.change.toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default Overview;
