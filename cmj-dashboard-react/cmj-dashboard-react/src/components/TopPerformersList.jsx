import React from 'react';

/**
 * Displays top performers for a specific metric
 * Used in the overview dashboard to show leaderboards
 */
export default function TopPerformersList({ title, icon, performers, metricKey, unit, colorClass }) {
  const getMetricValue = (athlete) => {
    const value = athlete[metricKey];
    if (metricKey === 'peak_power') return Math.round(value);
    if (metricKey === 'rsi_modified') return value.toFixed(2);
    return value.toFixed(1);
  };

  const textColorClass = colorClass.includes('blue') ? 'text-blue' :
                         colorClass.includes('green') ? 'text-green' :
                         'text-purple';

  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-xl p-5 border-2 ${colorClass.replace('from-', 'border-').replace('-50', '-200').split(' ')[0]}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className={`text-lg font-bold ${textColorClass}-900`}>{title}</h3>
      </div>
      <div className="space-y-3">
        {performers.map((athlete, idx) => (
          <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-gray-900">
                  {idx + 1}. {athlete.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {athlete.position} #{athlete.number}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${textColorClass}-600`}>
                  {getMetricValue(athlete)}
                </div>
                <div className="text-xs text-gray-600">{unit}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
