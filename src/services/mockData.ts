import {
  InstagramAccount,
  LinkedInProfile,
  YouTubeChannel,
  GitHubProfile,
  ActivitySummary,
  DashboardData,
  HistoricalDataPoint,
  GrowthData,
  TimePeriod,
} from '@/types';

// Helper function to generate random variations
const randomVariation = (base: number, percentage: number): number => {
  const variation = base * (percentage / 100);
  return Math.floor(base + (Math.random() - 0.5) * variation);
};

// Helper function to generate historical data points
const generateHistoricalData = (
  startDate: Date,
  days: number,
  startValue: number,
  growthRate: number
): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  let currentValue = startValue;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - (days - 1 - i));

    currentValue += randomVariation(currentValue * growthRate, 15);
    currentValue = Math.max(Math.floor(currentValue), startValue);

    data.push({
      date: date.toISOString().split('T')[0],
      value: currentValue,
    });
  }

  return data;
};

// Helper function to calculate metrics
const calculateMetrics = (current: number, previous: number) => {
  const absoluteChange = current - previous;
  const percentChange = previous > 0 ? (absoluteChange / previous) * 100 : 0;
  const growthTrend: 'up' | 'down' | 'stable' = absoluteChange > 0 ? 'up' : absoluteChange < 0 ? 'down' : 'stable';

  return {
    current,
    previous,
    absoluteChange,
    percentChange: parseFloat(percentChange.toFixed(2)),
    growthTrend,
  };
};

// Generate Instagram Account Data
const generateInstagramAccount = (
  handle: string,
  followerCount: number
): InstagramAccount => {
  const previousFollowers = Math.floor(followerCount * 0.95);
  const currentPosts = 147;
  const previousPosts = 142;

  return {
    id: handle,
    username: handle.replace('_', ' '),
    handle,
    profileUrl: `https://www.instagram.com/${handle}/`,
    followers: calculateMetrics(followerCount, previousFollowers),
    posts: calculateMetrics(currentPosts, previousPosts),
    engagement: calculateMetrics(
      randomVariation(followerCount * 0.08, 10),
      randomVariation(previousFollowers * 0.07, 10)
    ),
    avgLikes: randomVariation(Math.floor(followerCount * 0.05), 15),
    avgComments: randomVariation(Math.floor(followerCount * 0.008), 20),
    reachLast7Days: randomVariation(Math.floor(followerCount * 2.5), 20),
    lastPostDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    postStreak: Math.floor(Math.random() * 30) + 5,
  };
};

// Mock Instagram accounts
export const mockInstagramAccount1 = generateInstagramAccount('akshay0112', 22450);
export const mockInstagramAccount2 = generateInstagramAccount('japaneasy101', 8920);

// Mock LinkedIn data - Account 1 (Personal)
export const mockLinkedInAccount1: LinkedInProfile = {
  name: 'Akshay Srivastava',
  profileUrl: 'https://www.linkedin.com/in/akshay543/',
  connections: calculateMetrics(3850, 3720),
  posts: calculateMetrics(56, 52),
  impressions: calculateMetrics(18500, 16200),
  engagement: calculateMetrics(1240, 1050),
  lastPostDate: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  postStreak: Math.floor(Math.random() * 25) + 3,
};

// Mock LinkedIn data - Account 2 (Company: Japaneasy101)
export const mockLinkedInAccount2: LinkedInProfile = {
  name: 'Japaneasy101',
  profileUrl: 'https://www.linkedin.com/company/japaneasy101/',
  connections: calculateMetrics(1240, 1120),
  posts: calculateMetrics(28, 26),
  impressions: calculateMetrics(5200, 4600),
  engagement: calculateMetrics(420, 380),
  lastPostDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  postStreak: Math.floor(Math.random() * 20) + 2,
};

// Export as default for backward compatibility
export const mockLinkedIn = mockLinkedInAccount1;

// Mock YouTube data
export const mockYouTube: YouTubeChannel = {
  channelName: 'Akshay Srivastava',
  handle: '@akshaysrivastava5270',
  channelUrl: 'https://www.youtube.com/@akshaysrivastava5270',
  subscribers: calculateMetrics(12840, 11950),
  totalViews: calculateMetrics(285000, 262000),
  videoCount: calculateMetrics(47, 46),
  avgLikes: randomVariation(320, 25),
  avgComments: randomVariation(48, 30),
  lastUploadDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  uploadStreak: Math.floor(Math.random() * 20) + 2,
  avgViewsPerVideo: 6060,
};

// Mock GitHub data
export const mockGitHub: GitHubProfile = {
  username: 'akshay01123',
  profileUrl: 'https://github.com/akshay01123',
  followers: calculateMetrics(156, 148),
  repositories: calculateMetrics(34, 32),
  commits: calculateMetrics(1240, 1100),
  contributions: calculateMetrics(487, 430),
  pullRequests: calculateMetrics(62, 58),
  issues: calculateMetrics(34, 32),
  stars: calculateMetrics(285, 260),
  contributionStreak: Math.floor(Math.random() * 45) + 5,
  lastActivityDate: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
};

// Mock activity summary - Account 1 (Personal)
export const mockActivitySummaryAccount1: ActivitySummary[] = [
  {
    platform: 'instagram',
    currentStreak: mockInstagramAccount1.postStreak,
    lastActivityDate: mockInstagramAccount1.lastPostDate,
    activityCount: 8,
    isActive: true,
  },
  {
    platform: 'linkedin',
    currentStreak: mockLinkedInAccount1.postStreak,
    lastActivityDate: mockLinkedInAccount1.lastPostDate,
    activityCount: 5,
    isActive: true,
  },
  {
    platform: 'youtube',
    currentStreak: mockYouTube.uploadStreak,
    lastActivityDate: mockYouTube.lastUploadDate,
    activityCount: 4,
    isActive: true,
  },
  {
    platform: 'github',
    currentStreak: mockGitHub.contributionStreak,
    lastActivityDate: mockGitHub.lastActivityDate,
    activityCount: 12,
    isActive: true,
  },
];

// Mock activity summary - Account 2 (Japaneasy101)
export const mockActivitySummaryAccount2: ActivitySummary[] = [
  {
    platform: 'instagram',
    currentStreak: mockInstagramAccount2.postStreak,
    lastActivityDate: mockInstagramAccount2.lastPostDate,
    activityCount: 6,
    isActive: true,
  },
  {
    platform: 'linkedin',
    currentStreak: mockLinkedInAccount2.postStreak,
    lastActivityDate: mockLinkedInAccount2.lastPostDate,
    activityCount: 3,
    isActive: true,
  },
];

// Export as default for backward compatibility
export const mockActivitySummary = mockActivitySummaryAccount1;



// Generate growth data for charts
export const generateGrowthData = (
  timePeriod: TimePeriod,
  startValue: number,
  growthRate: number = 0.002
): GrowthData => {
  const daysMap: Record<TimePeriod, number> = {
    '7d': 7,
    '1m': 30,
    '3m': 90,
    '6m': 180,
  };

  const days = daysMap[timePeriod];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const data = generateHistoricalData(startDate, days, startValue, growthRate);
  const endValue = data[data.length - 1].value;
  const absoluteChange = endValue - startValue;
  const percentChange = (absoluteChange / startValue) * 100;

  return {
    timePeriod,
    data,
    startValue,
    endValue,
    absoluteChange,
    percentChange,
  };
};

// Export mock dashboard data
export const mockDashboardData: DashboardData = {
  instagram: {
    account1: mockInstagramAccount1,
    account2: mockInstagramAccount2,
    combined: {
      account1: mockInstagramAccount1,
      account2: mockInstagramAccount2,
      totalFollowers: calculateMetrics(
        mockInstagramAccount1.followers.current + mockInstagramAccount2.followers.current,
        mockInstagramAccount1.followers.previous + mockInstagramAccount2.followers.previous
      ),
      totalPosts: calculateMetrics(
        mockInstagramAccount1.posts.current + mockInstagramAccount2.posts.current,
        mockInstagramAccount1.posts.previous + mockInstagramAccount2.posts.previous
      ),
      combinedEngagement: calculateMetrics(
        mockInstagramAccount1.engagement.current + mockInstagramAccount2.engagement.current,
        mockInstagramAccount1.engagement.previous + mockInstagramAccount2.engagement.previous
      ),
    },
  },
  linkedin: mockLinkedInAccount1,
  youtube: mockYouTube,
  github: mockGitHub,
  activitySummary: mockActivitySummaryAccount1,
  lastUpdated: new Date().toISOString(),
};

// Service to get mock data
export const mockDataService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDashboardData), 300);
    });
  },

  getGrowthData: async (
    platform: string,
    _metric: string,
    timePeriod: TimePeriod
  ): Promise<GrowthData> => {
    // Simulate API delay
    return new Promise((resolve) => {
      let startValue = 1000;
      let growthRate = 0.002;

      if (platform === 'instagram') {
        startValue = 20000;
        growthRate = 0.003;
      } else if (platform === 'github') {
        startValue = 1000;
        growthRate = 0.0015;
      } else if (platform === 'youtube') {
        startValue = 11000;
        growthRate = 0.005;
      }

      setTimeout(() => resolve(generateGrowthData(timePeriod, startValue, growthRate)), 300);
    });
  },

  getHistoricalMetrics: async (
    platform: string,
    metric: string,
    timePeriod: TimePeriod
  ): Promise<HistoricalDataPoint[]> => {
    const growthData = await mockDataService.getGrowthData(platform, metric, timePeriod);
    return growthData.data;
  },
};
