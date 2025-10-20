import React from 'react';

/**
 * Reusable performance metric card component
 * Displays a metric with a value and unit in a colored gradient card
 */
export default function PerformanceCard({
  label,
  value,
  unit,
  colorClass = 'from-blue-500 to-blue-700',
  textColorClass = 'text-blue-100',
  size = 'large'
}) {
  const valueSize = size === 'large' ? 'text-5xl' : 'text-4xl';
  const padding = size === 'large' ? 'p-6' : 'p-5';

  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-xl ${padding} text-white shadow-lg`}>
      <div className={`${textColorClass} text-sm font-semibold mb-2`}>
        {label}
      </div>
      <div className={`${valueSize} font-bold mb-2`}>
        {typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : value > 10 ? 1 : 2) : value}
      </div>
      <div className={`${textColorClass.replace('100', '200')} text-sm`}>
        {unit}
      </div>
    </div>
  );
}
