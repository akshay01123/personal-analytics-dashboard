# Mock Data Documentation

## 📊 Overview

The mock data system is designed to provide realistic data that mimics real API responses. This allows development and testing without external API dependencies.

## 🗂️ Mock Data Structure

### Instagram Accounts

#### Account 1: akshay0112
```typescript
{
  handle: 'akshay0112',
  followers: {
    current: 22,450,
    previous: 21,350,
    absoluteChange: +1,100,
    percentChange: +5.15%,
    growthTrend: 'up'
  },
  posts: {
    current: 147,
    previous: 142,
    absoluteChange: +5,
    percentChange: +3.52%,
    growthTrend: 'up'
  },
  engagement: calculated similar,
  avgLikes: ~1,122 per post,
  avgComments: ~180 per post,
  reachLast7Days: ~56,125 accounts,
  lastPostDate: varies by day,
  postStreak: 5-35 days
}
```

#### Account 2: japaneasy101
```typescript
{
  handle: 'japaneasy101',
  followers: 8,920,
  posts: 142,
  engagement: lower than main account,
  avgLikes: ~445,
  avgComments: ~65,
  reachLast7Days: ~22,300,
  postStreak: 3-35 days
}
```

#### Combined View
```typescript
{
  totalFollowers: account1.followers + account2.followers
  totalPosts: account1.posts + account2.posts
  combinedEngagement: account1.engagement + account2.engagement
}
```

### LinkedIn Profile

```typescript
{
  name: 'Akshay Srivastava',
  connections: 3,850,
  posts: 56,
  impressions: 18,500 (last 7 days),
  engagement: 1,240,
  lastPostDate: varies,
  postStreak: 3-25 days
}
```

### YouTube Channel

```typescript
{
  channelName: 'Akshay Srivastava',
  handle: '@akshaysrivastava5270',
  subscribers: 12,840,
  totalViews: 285,000,
  videoCount: 47,
  avgLikes: ~320 per video,
  avgComments: ~48 per video,
  lastUploadDate: varies,
  uploadStreak: 2-20 days,
  avgViewsPerVideo: 6,060
}
```

### GitHub Profile

```typescript
{
  username: 'akshay01123',
  followers: 156,
  repositories: 34,
  commits: 1,240,
  contributions: 487,
  pullRequests: 62,
  issues: 34,
  stars: 285,
  contributionStreak: 5-50 days,
  lastActivityDate: varies
}
```

### Travel Locations

```typescript
Array of locations with:
{
  id: unique identifier,
  name: city name,
  country: country name,
  visitDate: ISO 8601 date,
  endDate: optional end date,
  duration: number of days,
  notes: description,
  coordinates: { latitude, longitude }
}

Example: Tokyo (26 days), San Francisco (16 days), Singapore (14 days), Bangalore (26 days)
```

## 🔄 Data Generation Methods

### 1. Random Variation Function
```typescript
const randomVariation = (base: number, percentage: number): number => {
  const variation = base * (percentage / 100);
  return Math.floor(base + (Math.random() - 0.5) * variation);
};

// Usage with 15% variation
// Example: 1000 ± 150 range
randomVariation(1000, 15);
```

### 2. Historical Data Points
```typescript
// Generates array of daily data points
{
  date: '2024-09-27',
  value: 22450
}
with growth applied over time = linear upward trend
```

### 3. Metrics Calculation
```typescript
const calculateMetrics = (current: number, previous: number) => {
  const absoluteChange = current - previous;
  const percentChange = (absoluteChange / previous) * 100;
  const growthTrend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
  
  return {
    current,
    previous,
    absoluteChange,
    percentChange,
    growthTrend
  };
};
```

### 4. Growth Rate by Platform

| Platform | Weekly Growth Rate | Notes |
|----------|------------------|-------|
| Instagram | 0.3% | 3 posts/week average |
| LinkedIn | 0.1% | 1 post/week average |
| YouTube | 0.5% | 1 video/week average |
| GitHub | 0.15% | Consistent contributions |

## 📈 Historical Data Points (7D to 6M)

### How It Works
1. **Start Date**: Calculated backwards from today
2. **Day Count**: 7, 30, 90, or 180 days
3. **Variation**: ±15% daily fluctuation for realism
4. **Growth**: Applied gradually across period
5. **Output**: Array of 7-180 data points

### Example: 30-Day Instagram Followers
```
Day 1: 20,000 followers
Day 2: 20,145 followers (±15% variation + growth)
Day 3: 20,310 followers
...
Day 30: 22,450 followers

Chart shows gradual upward trend with natural variance
```

## 🎯 Key Characteristics

### Realistic Features
- ✅ Growth is not perfectly linear (±15% daily variance)
- ✅ Different growth rates per platform
- ✅ Plateaus and small dips (realistic behavior)
- ✅ Engagement rates proportional to follower count
- ✅ Activity streaks vary (3-50 days)

### Consistency
- ✅ Same data returned on subsequent calls (deterministic)
- ✅ Calculations are consistent with formulas
- ✅ Metrics match expectations (e.g., avgLikes < followers)

### Flexibility
- ✅ Time periods are properly segmented
- ✅ Can adjust base numbers easily
- ✅ Growth rates can be tweaked per platform
- ✅ Variation percentage can be increased/decreased

## 🔧 Modifying Mock Data

### Change Account Follower Count
```typescript
// In src/services/mockData.ts
export const mockInstagramAccount1 = generateInstagramAccount('akshay0112', 25000); // Was 22450
```

### Adjust Growth Rate
```typescript
// In generateGrowthData
const growthData = generateGrowthData(
  '1m',
  20000,
  0.005  // Increased from 0.002 (0.5% instead of 0.2%)
);
```

### Add History Variance
```typescript
// In generateHistoricalData
currentValue += randomVariation(currentValue * growthRate, 25); // Was 15
```

### Add New Travel Location
```typescript
export const mockTravelLocations: TravelLocation[] = [
  // ... existing locations ...
  {
    id: '5',
    name: 'Berlin',
    country: 'Germany',
    visitDate: '2024-05-01',
    endDate: '2024-05-10',
    duration: 9,
    notes: 'Tech conference and startup visits',
    coordinates: { latitude: 52.520, longitude: 13.405 }
  }
];
```

### Adjust Activity Streaks
```typescript
// Current formula
postStreak: Math.floor(Math.random() * 30) + 5; // 5-35 days

// Increase streaks
postStreak: Math.floor(Math.random() * 50) + 10; // 10-60 days
```

## 🔀 Transitioning to Real Data

### Step 1: Create Real Service
```typescript
// src/services/githubAPI.ts
export const githubAPI = {
  getProfile: async (username: string, token: string) => {
    // Real API implementation
  }
};
```

### Step 2: Keep Same Interface
```typescript
// Both services return same shape
{
  followers: { current, previous, absoluteChange, ... },
  repositories: { ... },
  // etc.
}
```

### Step 3: Conditional Import
```typescript
// In App.tsx
const dataService = process.env.VITE_GITHUB_TOKEN 
  ? githubAPI 
  : mockDataService;

const data = await dataService.getGithubData();
```

### Step 4: Gradual Migration
- Phase 3: Replace GitHub with real data
- Phase 4: Replace YouTube with real data
- Phases 5-6: Replace Instagram/LinkedIn (if APIs available)
- Keep mock data for development/demo purposes

## 📊 Data Validation

### What to Check
```typescript
// Followers should generally be positive
followers.current > 0 ✓

// Change shouldn't be huge
Math.abs(percentChange) < 20 ✓

// Growth trend matches values
(absoluteChange > 0 && growthTrend === 'up') ✓

// Engagement < followers
engagement.current < followers.current ✓

// Posts > 0
posts.current > 0 ✓

// Last post is recent
daysAgo < 30 ✓
```

## 🎲 Random Seed (Future Enhancement)

For reproducible tests, consider adding a seed:
```typescript
// Would make data deterministic
const seed = Date.now();
const random = seededRandom(seed);

// Every run with same seed = same data
```

## 📝 Notes for Next Phases

- **Phase 2**: Store mock data in database
- **Phase 3+**: Replace mock endpoints with real API calls
- **Testing**: Keep mock data for test environments
- **Demo**: Use mock data for live demos
- **Development**: Use mock data for local development

---

This mock data system should support development through Phase 6 and serve as a reference for real API integration.
