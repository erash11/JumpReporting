import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { cmjDataFull, positions } from './data/sampleData';

export default function CMJDashboard() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [view, setView] = useState('overview');
  const [sortBy, setSortBy] = useState('jump');

  // Get unique athletes (latest test only)
  const uniqueAthletes = useMemo(() => {
    const athleteMap = new Map();
    cmjDataFull.forEach(test => {
      const key = `${test.name}-${test.position}`;
      if (!athleteMap.has(key) || new Date(test.date) > new Date(athleteMap.get(key).date)) {
        athleteMap.set(key, test);
      }
    });
    return Array.from(athleteMap.values());
  }, []);

  // Get athlete test history
  const getAthleteHistory = (athlete) => {
    return cmjDataFull
      .filter(t => t.name === athlete.name && t.position === athlete.position)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Filter athletes by position
  const filteredAthletes = useMemo(() => {
    if (!selectedPosition) return [];
    return uniqueAthletes.filter(a => a.position === selectedPosition);
  }, [selectedPosition, uniqueAthletes]);

  // Calculate position statistics
  const positionStats = useMemo(() => {
    if (!selectedPosition || filteredAthletes.length === 0) return null;
    
    const avgJump = filteredAthletes.reduce((sum, a) => sum + a.jump_height_cm, 0) / filteredAthletes.length;
    const avgPower = filteredAthletes.reduce((sum, a) => sum + a.peak_power, 0) / filteredAthletes.length;
    const avgRSI = filteredAthletes.reduce((sum, a) => sum + a.rsi_modified, 0) / filteredAthletes.length;
    
    return { avgJump, avgPower, avgRSI };
  }, [selectedPosition, filteredAthletes]);

  // Sort athletes
  const sortedAthletes = useMemo(() => {
    return [...filteredAthletes].sort((a, b) => {
      switch(sortBy) {
        case 'jump': return b.jump_height_cm - a.jump_height_cm;
        case 'power': return b.peak_power - a.peak_power;
        case 'rsi': return b.rsi_modified - a.rsi_modified;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [filteredAthletes, sortBy]);

  // Top performers
  const topPerformers = useMemo(() => ({
    jump: [...uniqueAthletes].sort((a, b) => b.jump_height_cm - a.jump_height_cm).slice(0, 5),
    power: [...uniqueAthletes].sort((a, b) => b.peak_power - a.peak_power).slice(0, 5),
    rsi: [...uniqueAthletes].sort((a, b) => b.rsi_modified - a.rsi_modified).slice(0, 5)
  }), [uniqueAthletes]);

  const getPerformanceRating = (value, avg) => {
    const percentDiff = ((value - avg) / avg) * 100;
    if (percentDiff > 15) return { label: 'Excellent', color: 'bg-green-100 text-green-800 border-green-300' };
    if (percentDiff > 5) return { label: 'Good', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    if (percentDiff > -5) return { label: 'Average', color: 'bg-gray-100 text-gray-800 border-gray-300' };
    if (percentDiff > -15) return { label: 'Monitor', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    return { label: 'Needs Work', color: 'bg-red-100 text-red-800 border-red-300' };
  };

  const handlePositionClick = (posCode) => {
    setSelectedPosition(posCode);
    setSelectedAthlete(null);
    setView('cohort');
  };

  const handleAthleteClick = (athlete) => {
    setSelectedAthlete(athlete);
    setView('athlete');
  };

  const resetView = () => {
    setView('overview');
    setSelectedPosition('');
    setSelectedAthlete(null);
  };

  // Athlete test history chart data
  const athleteHistory = selectedAthlete ? getAthleteHistory(selectedAthlete) : [];
  const chartData = athleteHistory
    .slice()
    .reverse()
    .map(test => ({
      date: new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Jump Height': parseFloat(test.jump_height_cm.toFixed(1)),
      'Peak Power': Math.round(test.peak_power / 100) / 10, // Scale for dual axis
      'RSI': test.rsi_modified
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold">CMJ Performance Tracker</h1>
              <p className="text-blue-100 mt-2 text-lg">Baylor University Football 2025 • Force Plate Testing</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="bg-blue-700 px-3 py-1 rounded-full">5,827 Tests</span>
                <span className="bg-blue-700 px-3 py-1 rounded-full">112 Athletes</span>
                <span className="bg-blue-700 px-3 py-1 rounded-full">Sep-Oct 2025</span>
              </div>
            </div>
            {view !== 'overview' && (
              <button 
                onClick={resetView}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                ← Home
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* Breadcrumbs */}
        {view !== 'overview' && (
          <div className="flex items-center gap-2 text-sm bg-white rounded-lg px-4 py-3 shadow-sm">
            <button onClick={resetView} className="text-blue-600 hover:underline font-medium">
              Overview
            </button>
            {selectedPosition && (
              <>
                <span className="text-gray-400">›</span>
                <button 
                  onClick={() => setView('cohort')}
                  className={`${view === 'cohort' ? 'text-gray-900 font-semibold' : 'text-blue-600 hover:underline'}`}
                >
                  {positions.find(p => p.code === selectedPosition)?.name}
                </button>
              </>
            )}
            {selectedAthlete && (
              <>
                <span className="text-gray-400">›</span>
                <span className="text-gray-900 font-semibold">{selectedAthlete.name}</span>
              </>
            )}
          </div>
        )}

        {/* Overview View */}
        {view === 'overview' && (
          <>
            {/* Position Selection */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Position Group</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {positions.map(pos => (
                  <button
                    key={pos.code}
                    onClick={() => handlePositionClick(pos.code)}
                    className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left group"
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
                
                {/* Jump Height */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">⬆️</span>
                    <h3 className="text-lg font-bold text-blue-900">Jump Height</h3>
                  </div>
                  <div className="space-y-3">
                    {topPerformers.jump.map((athlete, idx) => (
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
                            <div className="text-2xl font-bold text-blue-600">
                              {athlete.jump_height_cm.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-600">cm</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peak Power */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">⚡</span>
                    <h3 className="text-lg font-bold text-green-900">Peak Power</h3>
                  </div>
                  <div className="space-y-3">
                    {topPerformers.power.map((athlete, idx) => (
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
                            <div className="text-2xl font-bold text-green-600">
                              {Math.round(athlete.peak_power)}
                            </div>
                            <div className="text-xs text-gray-600">W</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RSI */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">🚀</span>
                    <h3 className="text-lg font-bold text-purple-900">RSI-Modified</h3>
                  </div>
                  <div className="space-y-3">
                    {topPerformers.rsi.map((athlete, idx) => (
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
                            <div className="text-2xl font-bold text-purple-600">
                              {athlete.rsi_modified.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-600">m/s</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Position Summary */}
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
                              onClick={() => handlePositionClick(pos.code)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors"
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
        )}

        {/* Cohort View */}
        {view === 'cohort' && selectedPosition && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-blue-100 text-sm font-semibold mb-2">Athletes</div>
                <div className="text-4xl font-bold">{filteredAthletes.length}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-green-100 text-sm font-semibold mb-2">Avg Jump</div>
                <div className="text-4xl font-bold">{positionStats?.avgJump.toFixed(1)}</div>
                <div className="text-green-100 text-sm mt-1">cm</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-purple-100 text-sm font-semibold mb-2">Avg Power</div>
                <div className="text-4xl font-bold">{Math.round(positionStats?.avgPower)}</div>
                <div className="text-purple-100 text-sm mt-1">W</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-orange-100 text-sm font-semibold mb-2">Avg RSI</div>
                <div className="text-4xl font-bold">{positionStats?.avgRSI.toFixed(2)}</div>
              </div>
            </div>

            {/* Roster Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {positions.find(p => p.code === selectedPosition)?.name} Roster
                </h3>
                <select 
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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
                          <td className="text-right py-4 px-4 font-bold text-blue-600 text-lg">{athlete.jump_height_cm.toFixed(1)}</td>
                          <td className="text-right py-4 px-4 font-bold text-green-600">{Math.round(athlete.peak_power)}</td>
                          <td className="text-right py-4 px-4 font-bold text-purple-600">{athlete.rsi_modified.toFixed(2)}</td>
                          <td className="text-center py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${rating.color}`}>
                              {rating.label}
                            </span>
                          </td>
                          <td className="text-right py-4 px-4">
                            <button 
                              onClick={() => handleAthleteClick(athlete)}
                              className="text-blue-600 hover:text-blue-800 font-bold text-lg"
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
        )}

        {/* Athlete Profile View */}
        {view === 'athlete' && selectedAthlete && (
          <>
            {/* Athlete Header */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">{selectedAthlete.name}</h2>
                  <div className="flex gap-3 mt-3">
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-bold">
                      {selectedAthlete.position}
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-bold">
                      #{selectedAthlete.number}
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                      {selectedAthlete.bw_kg.toFixed(1)} kg / {(selectedAthlete.bw_kg * 2.20462).toFixed(1)} lbs
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                      {athleteHistory.length} tests
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                <div className="text-blue-100 text-sm font-semibold mb-2">Jump Height</div>
                <div className="text-5xl font-bold mb-2">{selectedAthlete.jump_height_cm.toFixed(1)}</div>
                <div className="text-blue-200 text-sm">centimeters</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg">
                <div className="text-green-100 text-sm font-semibold mb-2">Peak Power</div>
                <div className="text-5xl font-bold mb-2">{Math.round(selectedAthlete.peak_power)}</div>
                <div className="text-green-200 text-sm">watts</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                <div className="text-purple-100 text-sm font-semibold mb-2">RSI-Modified</div>
                <div className="text-5xl font-bold mb-2">{selectedAthlete.rsi_modified.toFixed(2)}</div>
                <div className="text-purple-200 text-sm">reactive strength</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white shadow-lg">
                <div className="text-orange-100 text-sm font-semibold mb-2">Peak Force</div>
                <div className="text-5xl font-bold mb-2">{Math.round(selectedAthlete.peak_force)}</div>
                <div className="text-orange-200 text-sm">newtons</div>
              </div>
            </div>

            {/* Performance Trends Chart */}
            {athleteHistory.length > 1 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis yAxisId="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="Jump Height" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Peak Power" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Detailed Metrics Grid */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-2 font-semibold">Takeoff Velocity</div>
                  <div className="text-3xl font-bold text-gray-900">{selectedAthlete.takeoff_velocity.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 mt-1">m/s</div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-2 font-semibold">Contraction Time</div>
                  <div className="text-3xl font-bold text-gray-900">{selectedAthlete.contraction_time}</div>
                  <div className="text-sm text-gray-600 mt-1">milliseconds</div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-2 font-semibold">CM Depth</div>
                  <div className="text-3xl font-bold text-gray-900">{selectedAthlete.countermovement_depth.toFixed(1)}</div>
                  <div className="text-sm text-gray-600 mt-1">cm</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border-2 border-blue-200">
                  <div className="text-sm text-blue-700 mb-2 font-semibold">Power/Weight Ratio</div>
                  <div className="text-3xl font-bold text-blue-900">
                    {(selectedAthlete.peak_power / selectedAthlete.bw_kg).toFixed(1)}
                  </div>
                  <div className="text-sm text-blue-700 mt-1">W/kg</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border-2 border-green-200">
                  <div className="text-sm text-green-700 mb-2 font-semibold">Force/BW Ratio</div>
                  <div className="text-3xl font-bold text-green-900">
                    {(selectedAthlete.peak_force / (selectedAthlete.bw_kg * 9.81)).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-700 mt-1">× bodyweight</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border-2 border-purple-200">
                  <div className="text-sm text-purple-700 mb-2 font-semibold">Latest Test</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {new Date(selectedAthlete.date).toLocaleDateString()}
                  </div>
                </div>

              </div>
            </div>

            {/* Test History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Test History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Date</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-700">Jump (cm)</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-700">Power (W)</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-700">Force (N)</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-700">RSI</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-700">Velocity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {athleteHistory.map((test, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {new Date(test.date).toLocaleDateString()}
                        </td>
                        <td className="text-right py-3 px-4 font-bold text-blue-600">
                          {test.jump_height_cm.toFixed(1)}
                        </td>
                        <td className="text-right py-3 px-4 font-bold text-green-600">
                          {Math.round(test.peak_power)}
                        </td>
                        <td className="text-right py-3 px-4 text-gray-700">
                          {Math.round(test.peak_force)}
                        </td>
                        <td className="text-right py-3 px-4 font-bold text-purple-600">
                          {test.rsi_modified.toFixed(2)}
                        </td>
                        <td className="text-right py-3 px-4 text-gray-700">
                          {test.takeoff_velocity.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
