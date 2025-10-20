import React from 'react';

/**
 * Simple stat card for displaying summary statistics
 * Used in cohort view for position averages
 */
export default function StatCard({ label, value, unit, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-100',
    green: 'from-green-500 to-green-600 text-green-100',
    purple: 'from-purple-500 to-purple-600 text-purple-100',
    orange: 'from-orange-500 to-orange-600 text-orange-100'
  };

  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-xl p-6 text-white shadow-lg`}>
      <div className={`${color === 'blue' ? 'text-blue-100' : color === 'green' ? 'text-green-100' : color === 'purple' ? 'text-purple-100' : 'text-orange-100'} text-sm font-semibold mb-2`}>
        {label}
      </div>
      <div className="text-4xl font-bold">{value}</div>
      {unit && <div className={`${color === 'blue' ? 'text-blue-100' : color === 'green' ? 'text-green-100' : color === 'purple' ? 'text-purple-100' : 'text-orange-100'} text-sm mt-1`}>{unit}</div>}
    </div>
  );
}
