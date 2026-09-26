# Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Git for version control

### First Time Setup

```bash
# Clone or navigate to project
cd "/Users/akshay/Desktop/Projects/2609 sm-dashboard"

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173/
```

## 📝 Coding Standards

### TypeScript
- Always use types, never `any`
- Interface names: PascalCase, start with capital letter
- Type names: PascalCase
- Variable/function names: camelCase

### Component Structure
```typescript
import React from 'react';
// External imports first
import { ComponentType } from '@/types';
import { utilFunction } from '@/utils/formatting';

// Internal component
interface ComponentProps {
  data: ComponentType;
  onAction: () => void;
}

const ComponentName: React.FC<ComponentProps> = ({ data, onAction }) => {
  // Logic here
  
  return (
    // JSX here
  );
};

export default ComponentName;
```

### Function Naming
- Utility functions: `calculateX`, `formatX`, `getX`
- Event handlers: `handleX`, `onX`
- React hooks: `useX`

## 📁 File Organization

### Adding New Components
```
src/components/
├── sections/
│   ├── NewSection.tsx      ← Add here for major sections
│   └── index.ts
├── cards/                  ← Create if multiple card variants
│   ├── StatCard.tsx
│   └── index.ts
└── common/                 ← Reusable small components
    ├── LoadingSpinner.tsx
    └── index.ts
```

### Adding New Services
```
src/services/
├── mockData.ts             ← Current mock service
├── realDataService.ts      ← Future real API service
├── githubAPI.ts            ← Phase 3 GitHub API
└── youtubeAPI.ts           ← Phase 4 YouTube API
```

### Adding New Types
```typescript
// In src/types/index.ts

// Group by platform or feature
export interface NewType {
  // fields
}

export type NewUnion = 'option1' | 'option2';
```

## 🔄 Development Workflow

### Feature Development
1. Create feature branch
   ```bash
   git checkout -b feat/feature-name
   ```

2. Make changes in the appropriate files

3. Test locally
   ```bash
   npm run build    # Test production build
   npm run dev      # Test dev mode
   ```

4. Run linter
   ```bash
   npm run lint
   ```

5. Commit with clear message
   ```bash
   git commit -m "feat: add new feature description"
   ```

### Before Commits
- Ensure TypeScript builds: `npm run build`
- Check for unused variables
- Verify dark mode works
- Test on mobile (DevTools)

## 🔗 Adding API Integration (Future Phases)

### Structure for New Platform API

#### Step 1: Create Service File
```typescript
// src/services/githubAPI.ts
import { GitHubProfile } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';

export const githubAPI = {
  getProfile: async (username: string, token: string): Promise<GitHubProfile> => {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch GitHub profile');
    
    const data = await response.json();
    
    // Transform to our interface
    return {
      username: data.login,
      profileUrl: data.html_url,
      followers: {
        current: data.followers,
        previous: 0, // Would come from database
        absoluteChange: 0,
        percentChange: 0,
        growthTrend: 'stable'
      },
      // ... other fields
    };
  },

  getContributions: async (username: string, token: string, period: TimePeriod) => {
    // Fetch contribution data
  }
};
```

#### Step 2: Update App.tsx to Use New Service
```typescript
// Import both services
import { mockDataService } from '@/services/mockData';
import { githubAPI } from '@/services/githubAPI';
import { realDataService } from '@/services/realDataService';

// Use real service if token exists
const dataService = process.env.VITE_GITHUB_TOKEN ? realDataService : mockDataService;

// Or conditionally per platform
const getGithubData = async () => {
  if (process.env.VITE_GITHUB_TOKEN) {
    return githubAPI.getProfile('akshay01123', process.env.VITE_GITHUB_TOKEN);
  } else {
    return mockDataService.getDashboardData(); // Fall back to mock
  }
};
```

#### Step 3: Update Environment Variables
```bash
# .env
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
VITE_YOUTUBE_API_KEY=AIzaSyD...
```

### Phase-by-Phase API Implementation

#### Phase 3: GitHub
- **Endpoints**:
  - User profile: `GET /users/{username}`
  - Followers: Included in profile
  - Repos: `GET /users/{username}/repos`
  - Commits: `GET /repos/{owner}/{repo}/commits`
  - Contributions: Use GitHub GraphQL or scrape rest graph

- **Rate Limits**: 60 req/hour (unauthenticated), 5000 req/hour (authenticated)
- **Authentication**: Personal Access Token

#### Phase 4: YouTube
- **API**: YouTube Analytics API
- **Endpoints**:
  - Channel stats: subscribers, views, video count
  - Video list and performance
  - Comments per video

- **Authentication**: OAuth 2.0
- **Considerations**: Channel ownership required for analytics

#### Phase 5: Instagram
- **Challenge**: Official API is limited
- **Options**:
  1. Meta Graph API (business profiles only)
  2. Instagram Basic Display API
  3. Unofficial scraping (risky)

#### Phase 6: LinkedIn
- **Challenge**: LinkedIn doesn't provide public API for personal profiles
- **Options**:
  1. LinkedIn Official API (for business use)
  2. Unofficial approaches (not recommended)
  3. Alternative: Track manually or use LinkedIn insights page

## 🗄️ Database Schema (Phase 2)

### Tables Structure
```sql
-- Platforms table
CREATE TABLE platforms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  username VARCHAR(100),
  url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Metrics history
CREATE TABLE metrics_history (
  id SERIAL PRIMARY KEY,
  platform_id INTEGER REFERENCES platforms(id),
  metric_name VARCHAR(100),
  metric_value INTEGER,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_platform_date (platform_id, recorded_at)
);

-- Travel locations
CREATE TABLE travel_locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  country VARCHAR(100),
  visit_date DATE,
  end_date DATE,
  notes TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing Checklist

### Before Each Release
- [ ] All pages load without errors
- [ ] Dark mode toggles correctly
- [ ] Time period selector works
- [ ] Instagram account switcher works
- [ ] Charts display correctly
- [ ] Responsive on mobile (iPhone SE)
- [ ] Responsive on tablet (iPad)
- [ ] Responsive on desktop
- [ ] No console errors
- [ ] No TypeScript errors

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

## 🐛 Debug Mode

### Enable Console Logging
```typescript
// In components
useEffect(() => {
  console.log('Dashboard data:', dashboardData);
}, [dashboardData]);
```

### React DevTools
- Install React DevTools browser extension
- Inspect component tree
- View props/state changes
- Profile performance

### Network Monitoring
- Open DevTools → Network tab
- Watch API calls (future phases)
- Check response times

## 📊 Performance Monitoring

### Current Metrics to Track
```typescript
// In App.tsx
useEffect(() => {
  const startTime = performance.now();
  
  const loadData = async () => {
    const data = await mockDataService.getDashboardData();
    const endTime = performance.now();
    console.log(`Data load time: ${endTime - startTime}ms`);
  };
  
  loadData();
}, []);
```

### Lighthouse Audit
```bash
# Build and test with Lighthouse
npm run build
npm run preview

# Then run Lighthouse in Chrome DevTools
```

## 🚢 Deployment

### Production Build
```bash
npm run build

# Output in dist/ directory
# Ready to deploy to Vercel, Netlify, GitHub Pages, etc.
```

### Environment Variables for Production
- Create `.env.production` with production API keys
- Never commit API keys
- Use secure secret management

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Debugging
npm run build            # Full build (catches more errors)

# Dependencies
npm install              # Install all packages
npm update              # Update packages
npm audit               # Check for vulnerabilities
npm audit fix           # Fix vulnerabilities
```

## 🎯 Common Tasks

### Add New Metric to Platform Card
1. Update interface in `src/types/index.ts`
2. Update mock data in `src/services/mockData.ts`
3. Update PlatformCard props in `src/components/PlatformCard.tsx`
4. Update Overview section using the new prop

### Change Chart Time Period Granularity
1. Edit `TimePeriod` type in `src/types/index.ts` if adding periods
2. Update time period buttons in `App.tsx`
3. Update `generateGrowthData()` in `src/services/mockData.ts`
4. Update labels in `src/utils/formatting.ts`

### Add New Travel Location
1. Add to `mockTravelLocations` array in `src/services/mockData.ts`
2. Follow existing format with date, duration, notes
3. Or later, add form to input new locations

### Implement Dark Mode Toggle
- Already done! See `App.tsx` for implementation
- Uses Tailwind's `dark` class
- Toggle function: `setDarkMode(!darkMode)`

## 📖 Resources

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Docs](https://recharts.org/api)
- [Lucide Icons](https://lucide.dev/)

## ❓ Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### TypeScript Errors After Changes
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build
```

### Dark Mode Not Working
- Check if `dark` class is on root element
- Verify Tailwind config has `darkMode: 'class'`
- Check browser console for errors

### Charts Not Displaying
- Verify data is loaded: `console.log(growthDataMap)`
- Check Recharts component props
- Ensure ResponsiveContainer has parent with height

---

Happy coding! 🎉
