import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Sample CMJ Data (in production, this would come from your processed_cmj_data.json)
const cmjData = [
  { name: "Devyn Bobby", position: "S", number: "3", date: "2025-10-02", bw_kg: 78.71, rsi_modified: 1.04, jump_height_cm: 70.1, peak_power: 6782, peak_force: 2731, takeoff_velocity: 3.71, contraction_time: 645, countermovement_depth: -39.1, tests: 12 },
  { name: "Carl Williams", position: "S", number: "5", date: "2025-10-02", bw_kg: 83.48, rsi_modified: 0.85, jump_height_cm: 54.1, peak_power: 6364, peak_force: 2556, takeoff_velocity: 3.26, contraction_time: 681, countermovement_depth: -33.3, tests: 18 },
  { name: "Bo Onu", position: "S", number: "21", date: "2025-10-02", bw_kg: 91.58, rsi_modified: 0.99, jump_height_cm: 66.5, peak_power: 7967, peak_force: 2692, takeoff_velocity: 3.61, contraction_time: 756, countermovement_depth: -34.0, tests: 15 },
  { name: "Reggie Bush", position: "CB", number: "22", date: "2025-09-25", bw_kg: 79.52, rsi_modified: 0.91, jump_height_cm: 66.3, peak_power: 6523, peak_force: 2456, takeoff_velocity: 3.61, contraction_time: 698, countermovement_depth: -35.2, tests: 22 },
  { name: "Kelsey Johnson", position: "TE", number: "12", date: "2025-10-02", bw_kg: 112.46, rsi_modified: 0.74, jump_height_cm: 47.0, peak_power: 8144, peak_force: 3512, takeoff_velocity: 3.03, contraction_time: 674, countermovement_depth: -33.4, tests: 14 },
  { name: "Michael Trigg", position: "TE", number: "1", date: "2025-10-02", bw_kg: 105.14, rsi_modified: 0.83, jump_height_cm: 47.2, peak_power: 7485, peak_force: 3515, takeoff_velocity: 3.05, contraction_time: 561, countermovement_depth: -26.2, tests: 16 },
  { name: "Leo Almanza", position: "CB", number: "19", date: "2025-10-02", bw_kg: 81.83, rsi_modified: 1.02, jump_height_cm: 55.9, peak_power: 6698, peak_force: 2726, takeoff_velocity: 3.31, contraction_time: 603, countermovement_depth: -29.8, tests: 19 },
  { name: "KJ Makins", position: "CB", number: "14", date: "2025-10-02", bw_kg: 80.1, rsi_modified: 1.01, jump_height_cm: 54.6, peak_power: 6179, peak_force: 2722, takeoff_velocity: 3.28, contraction_time: 574, countermovement_depth: -33.6, tests: 21 },
  { name: "Joshua Cameron", position: "WR", number: "34", date: "2025-10-02", bw_kg: 97.15, rsi_modified: 0.82, jump_height_cm: 52.3, peak_power: 6474, peak_force: 3104, takeoff_velocity: 3.21, contraction_time: 656, countermovement_depth: -38.0, tests: 11 },
  { name: "Taz Williams", position: "WR", number: "88", date: "2025-10-02", bw_kg: 84.8, rsi_modified: 0.97, jump_height_cm: 60.5, peak_power: 6843, peak_force: 2536, takeoff_velocity: 3.44, contraction_time: 655, countermovement_depth: -33.5, tests: 13 },
  { name: "Louis Brown", position: "WR", number: "4", date: "2025-10-02", bw_kg: 86.39, rsi_modified: 0.93, jump_height_cm: 57.7, peak_power: 6829, peak_force: 2798, takeoff_velocity: 3.37, contraction_time: 665, countermovement_depth: -31.8, tests: 17 },
  { name: "Kole Wilson", position: "WR", number: "2", date: "2025-10-02", bw_kg: 75.01, rsi_modified: 0.96, jump_height_cm: 61.5, peak_power: 5631, peak_force: 2565, takeoff_velocity: 3.47, contraction_time: 676, countermovement_depth: -47.3, tests: 20 },
  { name: "Walker White", position: "QB", number: "11", date: "2025-10-02", bw_kg: 101.84, rsi_modified: 0.76, jump_height_cm: 46.7, peak_power: 6784, peak_force: 2706, takeoff_velocity: 3.03, contraction_time: 732, countermovement_depth: -46.1, tests: 9 },
  { name: "Sawyer Robertson", position: "QB", number: "13", date: "2025-10-02", bw_kg: 100.27, rsi_modified: 0.73, jump_height_cm: 48.8, peak_power: 6837, peak_force: 2479, takeoff_velocity: 3.09, contraction_time: 807, countermovement_depth: -43.9, tests: 8 },
  { name: "Keaton Thomas", position: "LB", number: "11", date: "2025-10-02", bw_kg: 99.43, rsi_modified: 0.88, jump_height_cm: 54.1, peak_power: 7076, peak_force: 2854, takeoff_velocity: 3.25, contraction_time: 735, countermovement_depth: -48.0, tests: 10 }
];

const positions = [
  { code: "WR", name: "Wide Receiver", tests: 452 },
  { code: "S", name: "Safety", tests: 912 },
  { code: "CB", name: "Cornerback", tests: 639 },
  { code: "RB", name: "Running Back", tests: 315 },
  { code: "TE", name: "Tight End", tests: 484 },
  { code: "QB", name: "Quarterback", tests: 316 },
  { code: "LB", name: "Linebacker", tests: 395 },
  { code: "OLB", name: "Outside Linebacker", tests: 287 },
  { code: "DL", name: "Defensive Line", tests: 742 },
  { code: "OL", name: "Offensive Line", tests: 904 }
];

export default function CMJDashboard() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [view, setView] = useState('overview');
  const [sortBy, setSortBy] = useState('jump');

  // Filter athletes by position
  const filteredAthletes = useMemo(() => {
    if (!selectedPosition) return [];
    return cmjData.filter(a => a.position === selectedPosition);
  }, [selectedPosition]);

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
    jump: [...cmjData].sort((a, b) => b.jump_height_cm - a.jump_height_cm).slice(0, 5),
    power: [...cmjData].sort((a, b) => b.peak_power - a.peak_power).slice(0, 5),
    rsi: [...cmjData].sort((a, b) => b.rsi_modified - a.rsi_modified).slice(0, 5)
  }), []);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CMJ Performance Dashboard</h1>
              <p className="text-gray-600 mt-1">BUFB 2025 • 5,827 Total Tests • 112 Athletes</p>
              <p className="text-sm text-gray-500 mt-1">September - October 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                In-Season Testing
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <button 
            onClick={resetView}
            className={`px-3 py-1 rounded ${view === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Overview
          </button>
          {selectedPosition && (
            <>
              <span className="text-gray-400">›</span>
              <button 
                onClick={() => setView('cohort')}
                className={`px-3 py-1 rounded ${view === 'cohort' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {positions.find(p => p.code === selectedPosition)?.name}
              </button>
            </>
          )}
          {selectedAthlete && (
            <>
              <span className="text-gray-400">›</span>
              <button 
                className="px-3 py-1 rounded bg-blue-500 text-white"
              >
                {selectedAthlete.name}
              </button>
            </>
          )}
        </div>

        {/* Overview View */}
        {view === 'overview' && (
          <>
            {/* Position Selection Grid */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Position Group</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {positions.map(pos => (
                  <button
                    key={pos.code}
                    onClick={() => handlePositionClick(pos.code)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">{pos.code}</div>
                    <div className="text-sm text-gray-600 mt-1">{pos.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{pos.tests} tests</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Jump Height Leaders */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    Jump Height Leaders
                  </h3>
                  <div className="space-y-2">
                    {topPerformers.jump.map((athlete, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white rounded p-2">
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">{idx + 1}. {athlete.name}</span>
                          <span className="text-xs text-gray-600 ml-2">({athlete.position} #{athlete.number})</span>
                        </div>
                        <span className="font-bold text-blue-600 text-lg">{athlete.jump_height_cm.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peak Power Leaders */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Peak Power Leaders
                  </h3>
                  <div className="space-y-2">
                    {topPerformers.power.map((athlete, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white rounded p-2">
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">{idx + 1}. {athlete.name}</span>
                          <span className="text-xs text-gray-600 ml-2">({athlete.position} #{athlete.number})</span>
                        </div>
                        <span className="font-bold text-green-600 text-lg">{Math.round(athlete.peak_power)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RSI Leaders */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    RSI Leaders
                  </h3>
                  <div className="space-y-2">
                    {topPerformers.rsi.map((athlete, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white rounded p-2">
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">{idx + 1}. {athlete.name}</span>
                          <span className="text-xs text-gray-600 ml-2">({athlete.position} #{athlete.number})</span>
                        </div>
                        <span className="font-bold text-purple-600 text-lg">{athlete.rsi_modified.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Position Summary Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Position Group Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Tests</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg Jump (cm)</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg Power (W)</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg RSI</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map(pos => {
                      const posAthletes = cmjData.filter(a => a.position === pos.code);
                      if (posAthletes.length === 0) return null;
                      
                      const avgJump = posAthletes.reduce((sum, a) => sum + a.jump_height_cm, 0) / posAthletes.length;
                      const avgPower = posAthletes.reduce((sum, a) => sum + a.peak_power, 0) / posAthletes.length;
                      const avgRSI = posAthletes.reduce((sum, a) => sum + a.rsi_modified, 0) / posAthletes.length;
                      
                      return (
                        <tr key={pos.code} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-gray-900">{pos.code}</div>
                            <div className="text-sm text-gray-600">{pos.name}</div>
                          </td>
                          <td className="text-right py-3 px-4 text-gray-700">{pos.tests}</td>
                          <td className="text-right py-3 px-4 font-semibold text-blue-600">{avgJump.toFixed(1)}</td>
                          <td className="text-right py-3 px-4 font-semibold text-green-600">{Math.round(avgPower)}</td>
                          <td className="text-right py-3 px-4 font-semibold text-purple-600">{avgRSI.toFixed(2)}</td>
                          <td className="text-right py-3 px-4">
                            <button 
                              onClick={() => handlePositionClick(pos.code)}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
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

        {/* Cohort Analysis View */}
        {view === 'cohort' && selectedPosition && (
          <>
            {/* Position Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {positions.find(p => p.code === selectedPosition)?.name} Analysis
                </h2>
                <button 
                  onClick={resetView}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  ← Back to Overview
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-semibold">Athletes in Group</div>
                  <div className="text-3xl font-bold text-blue-900 mt-2">{filteredAthletes.length}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-green-700 font-semibold">Avg Jump Height</div>
                  <div className="text-3xl font-bold text-green-900 mt-2">{positionStats?.avgJump.toFixed(1)} <span className="text-lg">cm</span></div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-purple-700 font-semibold">Avg Peak Power</div>
                  <div className="text-3xl font-bold text-purple-900 mt-2">{Math.round(positionStats?.avgPower)} <span className="text-lg">W</span></div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <div className="text-sm text-orange-700 font-semibold">Avg RSI</div>
                  <div className="text-3xl font-bold text-orange-900 mt-2">{positionStats?.avgRSI.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Athlete Roster */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Athlete Roster</h3>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="jump">Sort by: Jump Height</option>
                  <option value="power">Sort by: Peak Power</option>
                  <option value="rsi">Sort by: RSI</option>
                  <option value="name">Sort by: Name</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Athlete</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">#</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Tests</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Jump (cm)</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Power (W)</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">RSI</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Rating</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAthletes.map((athlete, idx) => {
                      const rating = getPerformanceRating(athlete.jump_height_cm, positionStats.avgJump);
                      
                      return (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-bold text-gray-900">{idx + 1}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{athlete.name}</td>
                          <td className="text-center py-3 px-4 text-gray-700">#{athlete.number}</td>
                          <td className="text-right py-3 px-4 text-gray-600">{athlete.tests}</td>
                          <td className="text-right py-3 px-4 font-bold text-blue-600">{athlete.jump_height_cm.toFixed(1)}</td>
                          <td className="text-right py-3 px-4 font-bold text-green-600">{Math.round(athlete.peak_power)}</td>
                          <td className="text-right py-3 px-4 font-bold text-purple-600">{athlete.rsi_modified.toFixed(2)}</td>
                          <td className="text-center py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${rating.color}`}>
                              {rating.label}
                            </span>
                          </td>
                          <td className="text-right py-3 px-4">
                            <button 
                              onClick={() => handleAthleteClick(athlete)}
                              className="text-blue-500 hover:text-blue-700 font-semibold"
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

        {/* Individual Athlete View */}
        {view === 'athlete' && selectedAthlete && (
          <>
            {/* Athlete Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedAthlete.name}</h2>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {selectedAthlete.position}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                      #{selectedAthlete.number}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                      {selectedAthlete.bw_kg.toFixed(1)} kg / {(selectedAthlete.bw_kg * 2.20462).toFixed(1)} lbs
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                      {selectedAthlete.tests} total tests
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setView('cohort')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  ← Back to {selectedPosition}
                </button>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                <div className="text-blue-100 text-sm font-semibold mb-2">Jump Height</div>
                <div className="text-5xl font-bold mb-1">{selectedAthlete.jump_height_cm.toFixed(1)}</div>
                <div className="text-blue-200 text-sm">centimeters</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
                <div className="text-green-100 text-sm font-semibold mb-2">Peak Power</div>
                <div className="text-5xl font-bold mb-1">{Math.round(selectedAthlete.peak_power)}</div>
                <div className="text-green-200 text-sm">watts</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                <div className="text-purple-100 text-sm font-semibold mb-2">RSI-Modified</div>
                <div className="text-5xl font-bold mb-1">{selectedAthlete.rsi_modified.toFixed(2)}</div>
                <div className="text-purple-200 text-sm">m/s</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
                <div className="text-orange-100 text-sm font-semibold mb-2">Peak Force</div>
                <div className="text-5xl font-bold mb-1">{Math.round(selectedAthlete.peak_force)}</div>
                <div className="text-orange-200 text-sm">newtons</div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Takeoff Velocity</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedAthlete.takeoff_velocity.toFixed(2)} m/s</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Contraction Time</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedAthlete.contraction_time} ms</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Countermovement Depth</div>
                  <div className="text-2xl font-bold text-gray-900">{Math.abs(selectedAthlete.countermovement_depth).toFixed(1)} cm</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Power-to-Weight Ratio</div>
                  <div className="text-2xl font-bold text-gray-900">{(selectedAthlete.peak_power / selectedAthlete.bw_kg).toFixed(1)} W/kg</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Force-to-BW Ratio</div>
                  <div className="text-2xl font-bold text-gray-900">{(selectedAthlete.peak_force / (selectedAthlete.bw_kg * 9.81)).toFixed(2)}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Test Date</div>
                  <div className="text-2xl font-bold text-gray-900">{new Date(selectedAthlete.date).toLocaleDateString()}</div>
                </div>

              </div>
            </div>

            {/* Performance Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Position Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Jump Height</span>
                    <span className="font-semibold text-gray-900">{selectedAthlete.jump_height_cm.toFixed(1)} cm</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(selectedAthlete.jump_height_cm / 75) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">Position avg: {positionStats?.avgJump.toFixed(1)} cm</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Peak Power</span>
                    <span className="font-semibold text-gray-900">{Math.round(selectedAthlete.peak_power)} W</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(selectedAthlete.peak_power / 9000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">Position avg: {Math.round(positionStats?.avgPower)} W</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">RSI-Modified</span>
                    <span className="font-semibold text-gray-900">{selectedAthlete.rsi_modified.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full"
                      style={{ width: `${(selectedAthlete.rsi_modified / 1.2) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">Position avg: {positionStats?.avgRSI.toFixed(2)}</div>
                </div>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
