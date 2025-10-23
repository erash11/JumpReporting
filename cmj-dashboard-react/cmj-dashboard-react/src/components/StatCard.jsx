import React from 'react';

/**
 * Simple stat card for displaying summary statistics
 * Used in cohort view for position averages
 */
export default function StatCard({ label, value, unit, color }) {
  const colorClasses = {
    green: {
      bg: 'from-baylor-green to-baylor-green-dark',
      text: 'text-white'
    },
    gold: {
      bg: 'from-baylor-gold to-baylor-gold-dark',
      text: 'text-baylor-green-dark'
    }
  };

  const colorClass = colorClasses[color] || colorClasses.green;

  return (
    <div className={`bg-gradient-to-br ${colorClass.bg} rounded-xl p-6 shadow-lg border-2 ${color === 'gold' ? 'border-baylor-gold-200' : 'border-baylor-green-200'}`}>
      <div className={`${colorClass.text} text-sm font-semibold mb-2 font-agency`}>
        {label}
      </div>
      <div className={`text-4xl font-bold font-agency ${colorClass.text}`}>{value}</div>
      {unit && <div className={`${colorClass.text} text-sm mt-1 font-agency`}>{unit}</div>}
    </div>
  );
}
