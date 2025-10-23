import React, { useState } from 'react';
import TopPerformersList from './TopPerformersList';
import { POSITION_GROUPS, getPositionGroup } from '../config/branding';

/**
 * Overview dashboard view
 * Shows position selection grid, top performers, and position summary table
 */
export default function OverviewView({ positions, uniqueAthletes, topPerformers, onPositionClick }) {
  const [groupingMode, setGroupingMode] = useState('byType'); // 'byType' or 'byUnit'

  const currentGroups = POSITION_GROUPS[groupingMode];

  return (
    <>
      {/* Grouping Mode Toggle */}
      <div className="bg-white rounded-lg shadow-md p-4 border-2 border-baylor-green">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-baylor-green font-agency">Group By:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setGroupingMode('byType')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                groupingMode === 'byType'
                  ? 'bg-baylor-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Skill / Mid / Big
            </button>
            <button
              onClick={() => setGroupingMode('byUnit')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                groupingMode === 'byUnit'
                  ? 'bg-baylor-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Offense / Defense
            </button>
          </div>
        </div>
      </div>

      {/* Position Selection by Groups */}
      {Object.entries(currentGroups).map(([groupKey, group]) => {
        const groupPositions = positions.filter(pos => group.positions.includes(pos.code));
        if (groupPositions.length === 0) return null;

        return (
          <div key={groupKey} className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: group.color }}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-agency" style={{ color: group.color }}>
                {group.name}
              </h2>
              {group.description && (
                <p className="text-sm text-gray-600 mt-1">{group.description}</p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {groupPositions.map(pos => (
                <button
                  key={pos.code}
                  onClick={() => onPositionClick(pos.code)}
                  className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:shadow-lg transition-all text-left group"
                  style={{
                    borderColor: 'transparent',
                    '&:hover': { borderColor: group.color }
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = group.color}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                  aria-label={`View ${pos.name} roster`}
                >
                  <div className="text-3xl font-bold font-agency text-gray-900 group-hover:text-baylor-green transition-colors">
                    {pos.code}
                  </div>
                  <div className="text-sm text-gray-700 mt-2 font-medium">{pos.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{pos.tests} tests</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-baylor-gold">
        <h2 className="text-2xl font-bold text-baylor-green mb-6 font-agency">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TopPerformersList
            title="Jump Height"
            performers={topPerformers.jump}
            metricKey="jump_height_cm"
            unit="cm"
            colorClass="from-baylor-gold-50 to-baylor-gold-100"
          />
          <TopPerformersList
            title="Peak Power"
            performers={topPerformers.power}
            metricKey="peak_power"
            unit="W"
            colorClass="from-baylor-green-50 to-baylor-green-100"
          />
          <TopPerformersList
            title="RSI-Modified"
            performers={topPerformers.rsi}
            metricKey="rsi_modified"
            unit="m/s"
            colorClass="from-baylor-gold-100 to-baylor-gold-200"
          />
        </div>
      </div>

      {/* Position Summary Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-baylor-green mb-6 font-agency">Position Group Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-baylor-green bg-baylor-green-50">
                <th className="text-left py-4 px-4 font-bold text-baylor-green font-agency">Position</th>
                <th className="text-right py-4 px-4 font-bold text-baylor-green font-agency">Tests</th>
                <th className="text-right py-4 px-4 font-bold text-baylor-green font-agency">Avg Jump</th>
                <th className="text-right py-4 px-4 font-bold text-baylor-green font-agency">Avg Power</th>
                <th className="text-right py-4 px-4 font-bold text-baylor-green font-agency">Avg RSI</th>
                <th className="text-right py-4 px-4 font-bold text-baylor-green font-agency"></th>
              </tr>
            </thead>
            <tbody>
              {positions.map(pos => {
                const posAthletes = uniqueAthletes.filter(a => a.position === pos.code);
                if (posAthletes.length === 0) return null;

                const avgJump = posAthletes.reduce((sum, a) => sum + a.jump_height_cm, 0) / posAthletes.length;
                const avgPower = posAthletes.reduce((sum, a) => sum + a.peak_power, 0) / posAthletes.length;
                const avgRSI = posAthletes.reduce((sum, a) => sum + a.rsi_modified, 0) / posAthletes.length;

                const group = getPositionGroup(pos.code, groupingMode);

                return (
                  <tr key={pos.code} className="border-b border-gray-100 hover:bg-baylor-green-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 font-agency">{pos.code}</div>
                      <div className="text-sm text-gray-600">{pos.name}</div>
                      {group && (
                        <div className="text-xs font-semibold mt-1" style={{ color: group.color }}>
                          {group.name}
                        </div>
                      )}
                    </td>
                    <td className="text-right py-4 px-4 text-gray-700 font-medium">{pos.tests}</td>
                    <td className="text-right py-4 px-4 font-bold text-baylor-gold-700">{avgJump.toFixed(1)} cm</td>
                    <td className="text-right py-4 px-4 font-bold text-baylor-green">{Math.round(avgPower)} W</td>
                    <td className="text-right py-4 px-4 font-bold text-baylor-gold-700">{avgRSI.toFixed(2)}</td>
                    <td className="text-right py-4 px-4">
                      <button
                        onClick={() => onPositionClick(pos.code)}
                        className="px-4 py-2 bg-baylor-gold text-baylor-green-dark rounded-lg hover:bg-baylor-gold-dark font-bold font-agency transition-colors"
                        aria-label={`View ${pos.name} details`}
                      >
                        View
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
