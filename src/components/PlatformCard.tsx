import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/utils/formatting';

interface PlatformCardProps {
  icon: React.ReactNode;
  title: string;
  mainMetric: string;
  mainMetricValue: number | string;
  secondaryMetric?: string;
  secondaryMetricValue?: number | string;
  change?: number;
  changePercent?: number;
  url?: string;
  className?: string;
  isClickable?: boolean;
  onClickExtra?: () => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  icon,
  title,
  mainMetric,
  mainMetricValue,
  secondaryMetric,
  secondaryMetricValue,
  change,
  changePercent,
  url,
  className = '',
  isClickable = false,
  onClickExtra,
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
    if (onClickExtra) {
      onClickExtra();
    }
  };

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={`stat-card group cursor-pointer ${isClickable ? 'hover:border-blue-300 dark:hover:border-blue-600' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <div className="text-right">
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 metric-change ${
                isPositive ? 'up' : isNegative ? 'down' : 'neutral'
              }`}
            >
              {isPositive ? (
                <TrendingUp size={16} />
              ) : isNegative ? (
                <TrendingDown size={16} />
              ) : null}
              <span>
                {isPositive && '+'}
                {Math.abs(change).toLocaleString()} ({formatPercentage(Math.abs(changePercent || 0))})
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="metric-label">{title}</p>
        <div className="mt-2">
          <p className="metric-value">
            {typeof mainMetricValue === 'number' ? formatNumber(mainMetricValue) : mainMetricValue}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{mainMetric}</p>

          {secondaryMetric && secondaryMetricValue !== undefined && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{secondaryMetric}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {typeof secondaryMetricValue === 'number'
                  ? formatNumber(secondaryMetricValue)
                  : secondaryMetricValue}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
