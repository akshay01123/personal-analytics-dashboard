import React, { useState, useEffect } from 'react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import { TimePeriod, GrowthData, DashboardData } from '@/types';
import { Instagram, Linkedin, Youtube, Github } from 'lucide-react';
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

  // Add projection lines to data
  const addProjections = (data: GrowthData['data'], endValue: number) => {
    if (data.length === 0) return data;

    const firstItem = data[0];
    const dailyGrowth = (endValue - firstItem.value) / (data.length - 1);

    const projectionMultipliers = [2, 3];
    const projectionPoints: any[] = [];

    projectionMultipliers.forEach((mult) => {
      const projDays = (data.length - 1) * mult;
      const projValue = endValue + dailyGrowth * (data.length - 1) * (mult - 1);

      projectionPoints.push({
        date: `+${projDays}d`,
        value: projValue,
        projection: true,
        actual: false,
      });
    });

    return [...data, ...projectionPoints];
  };

  const ChartCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    data: GrowthData;
    platform: string;
  }> = ({ title, icon, data }) => {
    const projectedData = addProjections(data.data, data.endValue);

    return (
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatNumber(data.startValue)} → {formatNumber(data.endValue)}
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={projectedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(value: any) => formatNumber(value)} />
            {/* Actual data */}
            <Area
              type="monotone"
              dataKey="value"
              data={data.data}
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              isAnimationActive={false}
            />
            {/* Projection lines (2x and 3x) */}
            <Line
              type="linear"
              dataKey="value"
              data={projectedData.slice(-2)}
              stroke="#3B82F6"
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
        Loading graphs...
      </div>
    );
  }

  const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram size={20} />,
    linkedin: <Linkedin size={20} />,
    youtube: <Youtube size={20} />,
    github: <Github size={20} />,
  };

  const platformTitles: Record<string, string> = {
    instagram: 'Instagram Followers',
    linkedin: 'LinkedIn Connections',
    youtube: 'YouTube Subscribers',
    github: 'GitHub Followers',
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Growth Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['instagram', 'linkedin', 'youtube', 'github'].map((platform) => (
          <ChartCard
            key={platform}
            title={platformTitles[platform]}
            icon={platformIcons[platform]}
            data={growthDataMap[platform] || { data: [], startValue: 0, endValue: 0 }}
            platform={platform}
          />
        ))}
      </div>
    </div>
  );
};

export default GrowthAnalytics;
