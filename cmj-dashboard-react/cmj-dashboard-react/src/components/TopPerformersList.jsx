import React from 'react';

/**
 * Displays top performers for a specific metric
 * Used in the overview dashboard to show leaderboards
 */
export default function TopPerformersList({ title, performers, metricKey, unit, colorClass }) {
  const getMetricValue = (athlete) => {
    const value = athlete[metricKey];
    if (metricKey === 'peak_power') return Math.round(value);
    if (metricKey === 'rsi_modified') return value.toFixed(2);
    return value.toFixed(1);
  };

  const textColorClass = colorClass.includes('baylor-gold') ? 'text-baylor-gold' :
                         colorClass.includes('baylor-green') ? 'text-baylor-green' :
                         'text-gray';

  const borderColorClass = colorClass.includes('baylor-gold') ? 'border-baylor-gold-200' :
                          colorClass.includes('baylor-green') ? 'border-baylor-green-200' :
                          'border-gray-200';

  return (
    <div className={`bg-gradient-to-br ${colorClass} rounded-xl p-5 border-2 ${borderColorClass}`}>
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${textColorClass}-900 font-agency`}>{title}</h3>
      </div>
      <div className="space-y-3">
        {performers.map((athlete, idx) => (
          <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-gray-900 font-agency">
                  {idx + 1}. {athlete.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {athlete.position}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${textColorClass}-700 font-agency`}>
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
