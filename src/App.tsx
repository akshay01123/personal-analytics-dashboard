import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { DashboardData, TimePeriod } from '@/types';
import { mockDataService, mockActivitySummaryAccount1, mockActivitySummaryAccount2 } from '@/services/mockData';
import Header from '@/components/Header';
import Overview from '@/components/sections/Overview';
import GrowthAnalytics from '@/components/sections/GrowthAnalytics';
import ActivityStreak from '@/components/sections/ActivityStreak';
import ProjectedGrowth from '@/components/sections/ProjectedGrowth';
import './App.css';

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('1m');
  const [instagramView, setInstagramView] = useState<'account1' | 'account2' | 'combined'>(
    'combined'
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await mockDataService.getDashboardData();
      setDashboardData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Header />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Overview Section */}
          <Overview
            dashboardData={dashboardData}
            instagramView={instagramView}
            setInstagramView={setInstagramView}
          />

          {/* Time Period Selector */}
          <div className="mt-8 gap-2 inline-flex bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
            {(['7d', '1m', '3m', '6m'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimePeriod(period)}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  selectedTimePeriod === period
                    ? 'bg-white dark:bg-dark-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {period === '7d' ? '7D' : period === '1m' ? '1M' : period === '3m' ? '3M' : '6M'}
              </button>
            ))}
          </div>

          {/* Growth Analytics Section */}
          <GrowthAnalytics timePeriod={selectedTimePeriod} dashboardData={dashboardData} />

          {/* Activity Streak Section */}
          <ActivityStreak 
            activitySummary={instagramView === 'account2' ? mockActivitySummaryAccount2 : mockActivitySummaryAccount1}
            currentAccount={instagramView === 'account2' ? 'account2' : 'account1'}
          />

          {/* Projected Growth Section */}
          <ProjectedGrowth dashboardData={dashboardData} />
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Analytics Dashboard • Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}</p>
            <p className="mt-2">Using mock data • Real APIs coming soon</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
