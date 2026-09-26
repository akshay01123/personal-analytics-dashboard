import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardData, TimePeriod, GrowthData } from '@/types';
import { mockDataService } from '@/services/mockData';
import { formatNumber } from '@/utils/formatting';

interface GrowthAnalyticsProps {
  timePeriod: TimePeriod;
  dashboardData: DashboardData;
}

const GrowthAnalytics: React.FC<GrowthAnalyticsProps> = ({ timePeriod }) => {
  const [growthDataMap, setGrowthDataMap] = useState<Record<string, GrowthData>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGrowthData = async () => {
      setLoading(true);
      try {
        const platforms = ['instagram', 'linkedin', 'youtube', 'github'];
        const metrics: Record<string, string> = {
          instagram: 'followers',
          linkedin: 'connections',
          youtube: 'subscribers',
          github: 'followers',
        };

        const newData: Record<string, GrowthData> = {};

        for (const platform of platforms) {
          const data = await mockDataService.getGrowthData(
            platform,
            metrics[platform],
            timePeriod
          );
          newData[platform] = data;
        }

        setGrowthDataMap(newData);
      } catch (error) {
        console.error('Failed to load growth data:', error);
      }
      setLoading(false);
    };

    loadGrowthData();
  }, [timePeriod]);

  if (loading) {
    return (
      <div className="mt-8 card p-8 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading growth data...</p>
      </div>
    );
  }

  const chartColors = {
    instagram: '#E1306C',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    github: '#333333',
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Growth Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instagram Growth */}
        <div className="card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instagram Followers</h3>
            {growthDataMap.instagram && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {formatNumber(growthDataMap.instagram.startValue)} →{' '}
                {formatNumber(growthDataMap.instagram.endValue)}
              </p>
            )}
          </div>
          {growthDataMap.instagram && (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={growthDataMap.instagram.data}>
                <defs>
                  <linearGradient id="colorInsta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.instagram} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartColors.instagram} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value: any) => formatNumber(value)}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors.instagram}
                  fillOpacity={1}
                  fill="url(#colorInsta)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* LinkedIn Growth */}
        <div className="card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">LinkedIn Connections</h3>
            {growthDataMap.linkedin && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {formatNumber(growthDataMap.linkedin.startValue)} →{' '}
                {formatNumber(growthDataMap.linkedin.endValue)}
              </p>
            )}
          </div>
          {growthDataMap.linkedin && (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={growthDataMap.linkedin.data}>
                <defs>
                  <linearGradient id="colorLinkedIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.linkedin} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartColors.linkedin} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value: any) => formatNumber(value)}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors.linkedin}
                  fillOpacity={1}
                  fill="url(#colorLinkedIn)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* YouTube Growth */}
        <div className="card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">YouTube Subscribers</h3>
            {growthDataMap.youtube && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {formatNumber(growthDataMap.youtube.startValue)} →{' '}
                {formatNumber(growthDataMap.youtube.endValue)}
              </p>
            )}
          </div>
          {growthDataMap.youtube && (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthDataMap.youtube.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value: any) => formatNumber(value)}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors.youtube}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* GitHub Growth */}
        <div className="card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub Followers</h3>
            {growthDataMap.github && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {formatNumber(growthDataMap.github.startValue)} →{' '}
                {formatNumber(growthDataMap.github.endValue)}
              </p>
            )}
          </div>
          {growthDataMap.github && (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthDataMap.github.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="currentColor"
                  style={{ color: 'currentColor' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value: any) => formatNumber(value)}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors.github}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrowthAnalytics;
