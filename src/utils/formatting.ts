// Utility functions for calculations and formatting

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatNumberFull = (num: number): string => {
  return num.toLocaleString();
};

export const formatPercentage = (num: number, decimals = 1): string => {
  return num.toFixed(decimals) + '%';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const getDaysSince = (dateString: string): number => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatDaysSince = (dateString: string): string => {
  const days = getDaysSince(dateString);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

// Growth projection based on linear regression
export const calculateGrowthProjection = (
  historicalValues: number[],
  futurePeriodsCount = 30
): {
  projected: number[];
  trendline: number[];
  confidence: 'high' | 'medium' | 'low';
} => {
  if (historicalValues.length < 2) {
    return {
      projected: [],
      trendline: [],
      confidence: 'low',
    };
  }

  const n = historicalValues.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const y = historicalValues;

  // Calculate means
  const xMean = x.reduce((a, b) => a + b) / n;
  const yMean = y.reduce((a, b) => a + b) / n;

  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += Math.pow(x[i] - xMean, 2);
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;

  // Generate trendline for historical data
  const trendline = x.map((xi) => intercept + slope * xi);

  // Generate projections
  const projected: number[] = [];
  for (let i = 0; i < futurePeriodsCount; i++) {
    const projectedX = n - 1 + i;
    const projectedY = Math.max(intercept + slope * projectedX, historicalValues[n - 1] * 0.8);
    projected.push(Math.floor(projectedY));
  }

  // Calculate R-squared for confidence
  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    ssRes += Math.pow(y[i] - trendline[i], 2);
    ssTot += Math.pow(y[i] - yMean, 2);
  }

  const rSquared = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (rSquared > 0.7) confidence = 'high';
  else if (rSquared > 0.4) confidence = 'medium';

  return {
    projected,
    trendline: trendline.map((v) => Math.floor(v)),
    confidence,
  };
};

// Calculate average growth rate
export const calculateAverageGrowthRate = (historicalValues: number[]): number => {
  if (historicalValues.length < 2) return 0;

  let totalGrowth = 0;
  for (let i = 1; i < historicalValues.length; i++) {
    const growth = (historicalValues[i] - historicalValues[i - 1]) / historicalValues[i - 1];
    totalGrowth += growth;
  }

  return totalGrowth / (historicalValues.length - 1);
};

// Estimate future value
export const estimateFutureValue = (
  currentValue: number,
  historicalValues: number[],
  futurePeriodsCount: number = 30
): number => {
  const growthRate = calculateAverageGrowthRate(historicalValues);
  let estimated = currentValue;

  for (let i = 0; i < futurePeriodsCount; i++) {
    estimated *= 1 + growthRate;
  }

  return Math.floor(estimated);
};

// Get change summary
export const getChangeSummary = (current: number, previous: number): {
  change: number;
  percentChange: number;
  direction: 'up' | 'down' | 'neutral';
  summary: string;
} => {
  const change = current - previous;
  const percentChange = previous > 0 ? (change / previous) * 100 : 0;
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';

  let summary = '';
  if (direction === 'up') {
    summary = `+${formatNumber(change)} (${formatPercentage(percentChange)})`;
  } else if (direction === 'down') {
    summary = `${formatNumber(change)} (${formatPercentage(percentChange)})`;
  } else {
    summary = 'No change';
  }

  return {
    change,
    percentChange,
    direction,
    summary,
  };
};

// Time period labels
export const getTimePeriodLabel = (period: '7d' | '1m' | '3m' | '6m'): string => {
  const labels = {
    '7d': 'Last 7 Days',
    '1m': 'Last Month',
    '3m': 'Last 3 Months',
    '6m': 'Last 6 Months',
  };
  return labels[period];
};

export const getTimePeriodShortLabel = (period: '7d' | '1m' | '3m' | '6m'): string => {
  const labels = {
    '7d': '7D',
    '1m': '1M',
    '3m': '3M',
    '6m': '6M',
  };
  return labels[period];
};
