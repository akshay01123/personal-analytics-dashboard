import React from 'react';
import { DashboardData } from '@/types';
import { mockLinkedInAccount2 } from '@/services/mockData';
import PlatformCard from '@/components/PlatformCard';

interface OverviewProps {
  dashboardData: DashboardData;
  instagramView: 'account1' | 'account2' | 'combined';
  setInstagramView: (view: 'account1' | 'account2' | 'combined') => void;
}

const Overview: React.FC<OverviewProps> = ({
  dashboardData,
  instagramView,
  setInstagramView,
}) => {
  // Determine which account view we're showing
  const isAccount1 = instagramView === 'account1';
  const isAccount2 = instagramView === 'account2';
  const isCombined = instagramView === 'combined';

  // Get Instagram data based on view
  const getInstagramData = () => {
    if (isCombined) {
      return {
        followers: dashboardData.instagram.combined.totalFollowers.current,
        posts: dashboardData.instagram.combined.totalPosts.current,
        change: dashboardData.instagram.combined.totalFollowers.absoluteChange,
        changePercent: dashboardData.instagram.combined.totalFollowers.percentChange,
      };
    } else if (isAccount2) {
      return {
        followers: dashboardData.instagram.account2.followers.current,
        posts: dashboardData.instagram.account2.posts.current,
        change: dashboardData.instagram.account2.followers.absoluteChange,
        changePercent: dashboardData.instagram.account2.followers.percentChange,
      };
    } else {
      return {
        followers: dashboardData.instagram.account1.followers.current,
        posts: dashboardData.instagram.account1.posts.current,
        change: dashboardData.instagram.account1.followers.absoluteChange,
        changePercent: dashboardData.instagram.account1.followers.percentChange,
      };
    }
  };

  // Get LinkedIn data based on account
  const getLinkedInData = () => {
    return isAccount2 ? mockLinkedInAccount2 : dashboardData.linkedin;
  };

  const igData = getInstagramData();
  const linkedinData = getLinkedInData();
  
  const igTitle =
    isAccount1
      ? 'Instagram (akshay0112)'
      : isAccount2
        ? 'Instagram (japaneasy101)'
        : 'Instagram (Combined)';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setInstagramView('account1')}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-all ${
              instagramView === 'account1'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          >
            Account 1
          </button>
          <button
            onClick={() => setInstagramView('account2')}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-all ${
              instagramView === 'account2'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          >
            Account 2
          </button>
          <button
            onClick={() => setInstagramView('combined')}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-all ${
              instagramView === 'combined'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          >
            Combined
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${isAccount2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
        {/* Instagram Card */}
        <PlatformCard
          icon="📱"
          title={igTitle}
          mainMetric="Followers"
          mainMetricValue={igData.followers}
          secondaryMetric="Posts"
          secondaryMetricValue={isCombined ? dashboardData.instagram.account1.posts.current + dashboardData.instagram.account2.posts.current : (isAccount2 ? dashboardData.instagram.account2.posts.current : dashboardData.instagram.account1.posts.current)}
          change={igData.change}
          changePercent={igData.changePercent}
          url={
            isCombined
              ? 'https://www.instagram.com/akshay0112/'
              : isAccount1
                ? 'https://www.instagram.com/akshay0112/'
                : 'https://www.instagram.com/japaneasy101/'
          }
          isClickable
        />

        {/* LinkedIn Card */}
        <PlatformCard
          icon="🔗"
          title={isAccount2 ? 'LinkedIn (Japaneasy101)' : 'LinkedIn'}
          mainMetric="Connections"
          mainMetricValue={linkedinData.connections.current}
          secondaryMetric="Impressions"
          secondaryMetricValue={linkedinData.impressions.current}
          change={linkedinData.connections.absoluteChange}
          changePercent={linkedinData.connections.percentChange}
          url={linkedinData.profileUrl}
          isClickable
        />

        {/* YouTube Card - Only show for Account 1 & Combined */}
        {(isAccount1 || isCombined) && (
          <PlatformCard
            icon="▶️"
            title="YouTube"
            mainMetric="Subscribers"
            mainMetricValue={dashboardData.youtube.subscribers.current}
            secondaryMetric="Total Views"
            secondaryMetricValue={dashboardData.youtube.totalViews.current}
            change={dashboardData.youtube.subscribers.absoluteChange}
            changePercent={dashboardData.youtube.subscribers.percentChange}
            url="https://www.youtube.com/@akshaysrivastava5270"
            isClickable
          />
        )}

        {/* GitHub Card - Only show for Account 1 & Combined */}
        {(isAccount1 || isCombined) && (
          <PlatformCard
            icon="🛠️"
            title="GitHub"
            mainMetric="Followers"
            mainMetricValue={dashboardData.github.followers.current}
            secondaryMetric="Repositories"
            secondaryMetricValue={dashboardData.github.repositories.current}
            change={dashboardData.github.followers.absoluteChange}
            changePercent={dashboardData.github.followers.percentChange}
            url="https://github.com/akshay01123"
            isClickable
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
