import React from 'react';

/**
 * Metric card for detailed statistics display
 * Used in the athlete profile view for secondary metrics
 */
export default function MetricCard({ label, value, unit, colorClass = 'from-gray-50 to-gray-100', borderColor = 'border-gray-200', textColor = 'text-gray' }) {
  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-lg p-5 border-2 ${borderColor}`}>
      <div className={`text-sm ${textColor}-600 mb-2 font-semibold`}>{label}</div>
      <div className={`text-3xl font-bold ${textColor}-900`}>
        {typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : value > 10 ? 1 : 2) : value}
      </div>
      <div className={`text-sm ${textColor}-600 mt-1`}>{unit}</div>
    </div>
  );
}
