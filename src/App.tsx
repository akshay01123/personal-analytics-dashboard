import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { DashboardData, TimePeriod } from '@/types';
import { mockDataService } from '@/services/mockData';
import Header from '@/components/Header';
import Overview from '@/components/sections/Overview';
import GrowthAnalytics from '@/components/sections/GrowthAnalytics';
import ActivityStreak from '@/components/sections/ActivityStreak';
import './App.css';

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'akshay' | 'japaneasy101'>('overview');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('1m');

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
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          {/* View Selector Tabs */}
          <div className="flex gap-2 mb-4 border-b border-gray-300 dark:border-dark-700">
            {(['overview', 'akshay', 'japaneasy101'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 font-semibold text-sm transition-all border-b-2 ${
                  selectedView === view
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {view === 'overview' ? 'Overview' : view === 'akshay' ? '👤 Akshay' : '🏢 Japaneasy101'}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedView === 'overview' && (
            <div>
              <Overview dashboardData={dashboardData} account={null} />

              {/* Graphs in single row */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Growth Charts</h3>
                  <div className="inline-flex gap-1 bg-gray-100 dark:bg-dark-800 rounded-lg p-0.5">
                    {(['7d', '1m', '3m', '6m'] as TimePeriod[]).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimePeriod(period)}
                        className={`px-1.5 py-0.5 text-xs rounded font-medium transition-all ${
                          selectedTimePeriod === period
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {period === '7d' ? '7D' : period === '1m' ? '30D' : period === '3m' ? '3M' : '6M'}
                      </button>
                    ))}
                  </div>
                </div>
                <GrowthAnalytics timePeriod={selectedTimePeriod} dashboardData={dashboardData} account={null} />
              </div>

              {/* Streaks */}
              <ActivityStreak dashboardData={dashboardData} account={null} />
            </div>
          )}

          {/* Akshay Tab */}
          {selectedView === 'akshay' && (
            <div>
              <Overview dashboardData={dashboardData} account="akshay" />

              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Growth Charts</h3>
                  <div className="inline-flex gap-1 bg-gray-100 dark:bg-dark-800 rounded-lg p-0.5">
                    {(['7d', '1m', '3m', '6m'] as TimePeriod[]).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimePeriod(period)}
                        className={`px-1.5 py-0.5 text-xs rounded font-medium transition-all ${
                          selectedTimePeriod === period
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {period === '7d' ? '7D' : period === '1m' ? '30D' : period === '3m' ? '3M' : '6M'}
                      </button>
                    ))}
                  </div>
                </div>
                <GrowthAnalytics timePeriod={selectedTimePeriod} dashboardData={dashboardData} account="akshay" />
              </div>

              <ActivityStreak dashboardData={dashboardData} account="akshay" />
            </div>
          )}

          {/* Japaneasy101 Tab */}
          {selectedView === 'japaneasy101' && (
            <div>
              <Overview dashboardData={dashboardData} account="japaneasy101" />

              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase">Growth Charts</h3>
                  <div className="inline-flex gap-1 bg-gray-100 dark:bg-dark-800 rounded-lg p-0.5">
                    {(['7d', '1m', '3m', '6m'] as TimePeriod[]).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimePeriod(period)}
                        className={`px-1.5 py-0.5 text-xs rounded font-medium transition-all ${
                          selectedTimePeriod === period
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {period === '7d' ? '7D' : period === '1m' ? '30D' : period === '3m' ? '3M' : '6M'}
                      </button>
                    ))}
                  </div>
                </div>
                <GrowthAnalytics timePeriod={selectedTimePeriod} dashboardData={dashboardData} account="japaneasy101" />
              </div>

              <ActivityStreak dashboardData={dashboardData} account="japaneasy101" />
            </div>
          )}
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
