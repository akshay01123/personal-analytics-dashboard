# Personal Analytics Dashboard - Architecture & Design

## 📐 Architecture Overview

This document outlines the technical architecture of the Personal Analytics Dashboard and explains the design decisions made to support future API integration.

## 🏗️ Current Architecture (Phase 1)

### Layer-Based Design

```
┌─────────────────────────────────────────────────────┐
│           React Components (UI Layer)               │
│  ┌──────────────────────────────────────────────┐  │
│  │ App.tsx → Header, Overview, Growth...        │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│      Data Service Layer (mockData.ts)               │
│  ┌──────────────────────────────────────────────┐  │
│  │ - getDashboardData()                         │  │
│  │ - getGrowthData(platform, metric, period)    │  │
│  │ - getHistoricalMetrics()                     │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│    Calculation & Utility Layer (utils/)             │
│  ┌──────────────────────────────────────────────┐  │
│  │ - formatNumber(), formatPercentage()         │  │
│  │ - calculateGrowthProjection()                │  │
│  │ - estimateFutureValue()                      │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│       Data & Type Definitions (types/)              │
│  ┌──────────────────────────────────────────────┐  │
│  │ - Platform interfaces                        │  │
│  │ - Metrics, GrowthData, etc.                  │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### 1. Initial Load
```
App Component
    ↓
useEffect → mockDataService.getDashboardData()
    ↓
Generate realistic mock data
    ↓
Update state → Re-render UI
```

### 2. Chart Updates (Time Period Change)
```
User selects time period (7D, 1M, 3M, 6M)
    ↓
setState(selectedTimePeriod)
    ↓
GrowthAnalytics component detects change
    ↓
useEffect → mockDataService.getGrowthData()
    ↓
Generate historical data for period
    ↓
Charts re-render with new data
```

### 3. Metric Calculations
```
Raw data from service
    ↓
calculateMetrics(current, previous)
    ↓
Returns: {
  current, previous, absoluteChange, 
  percentChange, growthTrend
}
    ↓
Components display formatted results
```

## 📦 Component Structure

### App.tsx - Root Component
- **Responsibility**: Orchestrate layout, manage global state
- **State**: dashboardData, loading, darkMode, selectedTimePeriod, instagramView
- **Children**: Header, Overview, GrowthAnalytics, ActivityStreak, ProjectedGrowth, TravelSection

### Overview.tsx
- **Responsibility**: Display platform overview cards
- **Features**:
  - Instagram account switcher (Account 1, Account 2, Combined)
  - Four platform cards with key metrics
  - Secondary metrics display
  - Change indicators (↑ ↓)
  - Clickable links to platform profiles

### GrowthAnalytics.tsx
- **Responsibility**: Render historical growth charts
- **Features**:
  - 4 charts (one per platform)
  - Area charts for Instagram/LinkedIn
  - Line charts for YouTube/GitHub
  - Dynamic data loading based on time period
  - Tooltip on hover
  - Color-coded by platform

### ActivityStreak.tsx
- **Responsibility**: Display activity tracking and streaks
- **Features**:
  - Current streak with fire emoji 🔥
  - Days since last activity
  - Weekly activity counts
  - Summary grid
  - Color-coded by platform

### ProjectedGrowth.tsx
- **Responsibility**: Show future growth predictions
- **Features**:
  - Linear regression-based projections
  - 30-day forecasts
  - Current vs Projected comparison
  - Confidence indicators
  - Educational info box

### TravelSection.tsx
- **Responsibility**: Display travel timeline
- **Features**:
  - Timeline visualization
  - Location cards with notes
  - Duration statistics
  - Country count
  - Average stay duration

## 🎯 Design Patterns

### 1. Service Pattern (mockDataService)
- Abstracts data fetching logic
- Same interface for mock and real APIs
- Can be swapped without UI changes
- Async/Promise-based for realistic API simulation

### 2. Utility Functions Pattern
- Reusable calculations in `utils/formatting.ts`
- Pure functions (no side effects)
- Can be tested independently
- Used across components

### 3. Component Composition
- Small, focused components
- Props-based configuration
- Reusable (e.g., PlatformCard)
- Clear separation of concerns

### 4. State Management
- React hooks (useState, useEffect)
- Minimal, local state where possible
- No external state management library (Phase 1)
- Easy to add Redux/Zustand later if needed

## 🔐 Security Considerations

### Environment Variables
- All API keys in `.env` (not tracked)
- `.env.example` shows required variables
- Frontend-only setup for Phase 1
- Will need backend for real APIs later

### Data Flow for Real APIs
```
Frontend → Backend (authenticated)
    ↓
Backend stores in database
    ↓
Backend retrieves and processes
    ↓
Frontend receives formatted data
    ↓
Never expose API keys to frontend
```

## 🧮 Calculation Methods

### Metrics Calculation
```typescript
{
  absoluteChange = current - previous
  percentChange = (absoluteChange / previous) * 100
  growthTrend = currentValue > previous ? 'up' : 'down' : 'stable'
}
```

### Growth Projections
- **Method**: Linear Regression
- **Formula**: y = mx + b
  - Calculate slope (m) from historical data
  - Calculate intercept (b)
  - Project forward using trendline
- **Confidence**: R² value (0.7+ = high, 0.4-0.7 = medium, <0.4 = low)

### Historical Data Generation
- **Random variations**: ±15% daily fluctuation
- **Growth rate**: Platform-specific (Instagram: 0.3%, GitHub: 0.15%)
- **Realistic**: Not perfectly linear; simulates real behavior

## 🎨 Styling Approach

### Tailwind CSS
- Utility-first CSS framework
- Dark mode support built-in
- Responsive design (sm, md, lg breakpoints)
- Custom Tailwind extensions in config

### Dark Mode Implementation
```typescript
// Toggle in App.tsx
darkMode ? document.documentElement.classList.add('dark') : remove()

// Tailwind automatically applies dark: variants
className="bg-white dark:bg-dark-900"
```

### Responsive Grid
- Mobile: 1 column
- Tablet: 2 columns (md)
- Desktop: 4 columns (lg)
- Automatic wrap at breakpoints

## 🔌 API Integration Strategy

### Current (Phase 1): Mock Service
```typescript
// src/services/mockData.ts
export const mockDataService = {
  getDashboardData: async () => { ... },
  getGrowthData: async (platform, metric, timePeriod) => { ... }
}
```

### Future (Phase 3+): Real API Service
```typescript
// src/services/realDataService.ts
export const realDataService = {
  getDashboardData: async () => { 
    // Call GitHub API, YouTube API, etc.
  },
  getGrowthData: async (platform, metric, timePeriod) => {
    // Fetch from database
  }
}
```

### Migration Path
1. Create `realDataService` parallel to `mockDataService`
2. Update App.tsx to conditionally use one or the other
3. Implement per-platform APIs incrementally
4. Tests ensure behavior parity

## 📊 Data Models

### Platform Interfaces
Each platform has specific metrics while maintaining a common `Metrics` structure:

```typescript
interface Metrics {
  current: number;
  previous: number;
  absoluteChange: number;
  percentChange: number;
  growthTrend: 'up' | 'down' | 'stable';
}

// Platform-specific extends this
interface InstagramAccount {
  followers: Metrics;
  posts: Metrics;
  engagement: Metrics;
  // ... platform-specific fields
}
```

### Historical Data Structure
```typescript
interface HistoricalDataPoint {
  date: string;  // ISO 8601
  value: number;
}

interface GrowthData {
  timePeriod: '7d' | '1m' | '3m' | '6m';
  data: HistoricalDataPoint[];
  startValue: number;
  endValue: number;
  absoluteChange: number;
  percentChange: number;
}
```

## 🧪 Testing Strategy (Future)

### Unit Tests
- Utility functions in `utils/formatting.ts`
- Calculation accuracy
- Edge cases (zero growth, negative changes)

### Integration Tests
- Component interactions
- Data flow between components
- State management

### E2E Tests
- Full dashboard workflow
- Time period switching
- Account switcher
- Dark mode toggle

## 📈 Performance Optimization (Future)

### Current Performance
- Initial load: ~300ms (mock data)
- Chart render: <100ms
- No optimization needed for Phase 1

### Future Optimizations
- Code splitting for components
- Lazy load travel section
- Memoize chart data calculations
- Virtual scrolling for large datasets
- Service worker for data caching

## 🚀 Deployment Strategy

### Current
- Vite build for production
- Static site (can be hosted anywhere)
- No backend required

### Future with APIs
- Separate frontend and backend repos
- Frontend: Vercel/Netlify
- Backend: Heroku/Railway/AWS
- Database: PostgreSQL/MongoDB
- API: Node.js/Python with authentication

## 📝 Code Quality

### TypeScript
- Strict mode enabled
- No `any` types
- Full type coverage

### ESlint
- React best practices
- No unused variables/imports
- Consistent code style

### CSS
- Tailwind utility classes
- Dark mode support
- Responsive design

## 🔮 Future Architecture Changes

### Phase 2: Database Introduction
```
Frontend → Backend ↔ Database
              ↑
        Historical snapshots
        Aggregated metrics
```

### Phase 7-9: Advanced Features
```
Frontend → Backend ↔ Cache
              ↓
           Database ← Data collectors
              ↓
           Analytics Engine ← ML/AI Models
```

## 📚 References

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/
- Recharts: https://recharts.org/
- Vite: https://vitejs.dev/

---

This architecture is designed to be **scalable, maintainable, and extensible** for the portfolio project's journey from mock data to real APIs to AI-powered analytics.
