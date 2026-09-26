// Platform types
export type Platform = 'instagram' | 'linkedin' | 'youtube' | 'github';

// Time period
export type TimePeriod = '7d' | '1m' | '3m' | '6m';

// Analytics metrics
export interface Metrics {
  current: number;
  previous: number;
  absoluteChange: number;
  percentChange: number;
  growthTrend: 'up' | 'down' | 'stable';
}

// Instagram Account
export interface InstagramAccount {
  id: string;
  username: string;
  handle: string;
  profileUrl: string;
  followers: Metrics;
  posts: Metrics;
  engagement: Metrics;
  avgLikes: number;
  avgComments: number;
  reachLast7Days: number;
  lastPostDate: string;
  postStreak: number;
}

// Instagram Combined Data
export interface InstagramCombined {
  account1: InstagramAccount;
  account2: InstagramAccount;
  totalFollowers: Metrics;
  totalPosts: Metrics;
  combinedEngagement: Metrics;
}

// LinkedIn Profile
export interface LinkedInProfile {
  name: string;
  profileUrl: string;
  connections: Metrics;
  posts: Metrics;
  impressions: Metrics;
  engagement: Metrics;
  lastPostDate: string;
  postStreak: number;
}

// YouTube Channel
export interface YouTubeChannel {
  channelName: string;
  handle: string;
  channelUrl: string;
  subscribers: Metrics;
  totalViews: Metrics;
  videoCount: Metrics;
  avgLikes: number;
  avgComments: number;
  lastUploadDate: string;
  uploadStreak: number;
  avgViewsPerVideo: number;
}

// GitHub Profile
export interface GitHubProfile {
  username: string;
  profileUrl: string;
  followers: Metrics;
  repositories: Metrics;
  commits: Metrics;
  contributions: Metrics;
  pullRequests: Metrics;
  issues: Metrics;
  stars: Metrics;
  contributionStreak: number;
  lastActivityDate: string;
}

// Historical data point
export interface HistoricalDataPoint {
  date: string;
  value: number;
}

// Growth data for a time period
export interface GrowthData {
  timePeriod: TimePeriod;
  data: HistoricalDataPoint[];
  startValue: number;
  endValue: number;
  absoluteChange: number;
  percentChange: number;
}

// Activity summary
export interface ActivitySummary {
  platform: Platform;
  currentStreak: number;
  lastActivityDate: string;
  activityCount: number;
  isActive: boolean;
}

// Dashboard data
export interface DashboardData {
  instagram: {
    account1: InstagramAccount;
    account2: InstagramAccount;
    combined: InstagramCombined;
  };
  linkedin: LinkedInProfile;
  youtube: YouTubeChannel;
  github: GitHubProfile;
  activitySummary: ActivitySummary[];
  lastUpdated: string;
}

// Growth projection
export interface GrowthProjection {
  metric: string;
  current: number;
  projected: number;
  timeframe: string; // e.g., "1 month", "3 months"
  confidence: 'high' | 'medium' | 'low';
}

export interface ProjectionData {
  platform: Platform;
  projections: GrowthProjection[];
}
