import React from 'react';
import StatCard from './StatCard';

/**
 * Cohort analysis view for a specific position
 * Shows position statistics and roster table with sortable columns
 */
export default function CohortView({
  selectedPosition,
  positions,
  filteredAthletes,
  positionStats,
  sortedAthletes,
  sortBy,
  setSortBy,
  onAthleteClick,
  getPerformanceRating
}) {
  const positionName = positions.find(p => p.code === selectedPosition)?.name;

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Athletes"
          value={filteredAthletes.length}
          color="blue"
        />
        <StatCard
          label="Avg Jump"
          value={positionStats?.avgJump.toFixed(1)}
          unit="cm"
          color="green"
        />
        <StatCard
          label="Avg Power"
          value={Math.round(positionStats?.avgPower)}
          unit="W"
          color="purple"
        />
        <StatCard
          label="Avg RSI"
          value={positionStats?.avgRSI.toFixed(2)}
          color="orange"
        />
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {positionName} Roster
          </h3>
          <select
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort roster by"
          >
            <option value="jump">Sort: Jump Height</option>
            <option value="power">Sort: Peak Power</option>
            <option value="rsi">Sort: RSI</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-4 font-bold text-gray-700">Rank</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700">Athlete</th>
                <th className="text-center py-4 px-4 font-bold text-gray-700">#</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Tests</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Jump (cm)</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">Power (W)</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700">RSI</th>
                <th className="text-center py-4 px-4 font-bold text-gray-700">Rating</th>
                <th className="text-right py-4 px-4 font-bold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {sortedAthletes.map((athlete, idx) => {
                const rating = getPerformanceRating(athlete.jump_height_cm, positionStats.avgJump);

                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-900 text-lg">{idx + 1}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{athlete.name}</td>
                    <td className="text-center py-4 px-4 text-gray-700 font-medium">#{athlete.number}</td>
                    <td className="text-right py-4 px-4 text-gray-600">{athlete.tests}</td>
                    <td className="text-right py-4 px-4 font-bold text-blue-600 text-lg">
                      {athlete.jump_height_cm.toFixed(1)}
                    </td>
                    <td className="text-right py-4 px-4 font-bold text-green-600">
                      {Math.round(athlete.peak_power)}
                    </td>
                    <td className="text-right py-4 px-4 font-bold text-purple-600">
                      {athlete.rsi_modified.toFixed(2)}
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${rating.color}`}>
                        {rating.label}
                      </span>
                    </td>
                    <td className="text-right py-4 px-4">
                      <button
                        onClick={() => onAthleteClick(athlete)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-lg"
                        aria-label={`View ${athlete.name} profile`}
                      >
                        →
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
