import React from 'react';
import TopPerformersList from './TopPerformersList';

/**
 * Overview dashboard view
 * Shows position selection grid, top performers, and position summary table
 */
export default function OverviewView({ positions, uniqueAthletes, topPerformers, onPositionClick }) {
  return (
    <>
      {/* Position Selection */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Position Group</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {positions.map(pos => (
            <button
              key={pos.code}
              onClick={() => onPositionClick(pos.code)}
              className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left group"
              aria-label={`View ${pos.name} roster`}
            >
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {pos.code}
              </div>
              <div className="text-sm text-gray-700 mt-2 font-medium">{pos.name}</div>
              <div className="text-xs text-gray-500 mt-1">{pos.tests} tests</div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TopPerformersList
            title="Jump Height"
            icon="⬆️"
            performers={topPerformers.jump}
            metricKey="jump_height_cm"
            unit="cm"
            colorClass="from-blue-50 to-blue-100"
          />
          <TopPerformersList
            title="Peak Power"
            icon="⚡"
            performers={topPerformers.power}
            metricKey="peak_power"
            unit="W"
            colorClass="from-green-50 to-green-100"
          />
          <TopPerformersList
            title="RSI-Modified"
            icon="🚀"
            performers={topPerformers.rsi}
            metricKey="rsi_modified"
            unit="m/s"
            colorClass="from-purple-50 to-purple-100"
          />
        </div>
      </div>

      {/* Position Summary Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Position Group Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-4 font-bold text-gray-700">Position</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Tests</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Avg Jump</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Avg Power</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Avg RSI</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {positions.map(pos => {
                const posAthletes = uniqueAthletes.filter(a => a.position === pos.code);
                if (posAthletes.length === 0) return null;

                const avgJump = posAthletes.reduce((sum, a) => sum + a.jump_height_cm, 0) / posAthletes.length;
                const avgPower = posAthletes.reduce((sum, a) => sum + a.peak_power, 0) / posAthletes.length;
                const avgRSI = posAthletes.reduce((sum, a) => sum + a.rsi_modified, 0) / posAthletes.length;

                return (
                  <tr key={pos.code} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900">{pos.code}</div>
                      <div className="text-sm text-gray-600">{pos.name}</div>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-700 font-medium">{pos.tests}</td>
                    <td className="text-right py-4 px-4 font-bold text-blue-600">{avgJump.toFixed(1)} cm</td>
                    <td className="text-right py-4 px-4 font-bold text-green-600">{Math.round(avgPower)} W</td>
                    <td className="text-right py-4 px-4 font-bold text-purple-600">{avgRSI.toFixed(2)}</td>
                    <td className="text-right py-4 px-4">
                      <button
                        onClick={() => onPositionClick(pos.code)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                        aria-label={`View ${pos.name} details`}
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
