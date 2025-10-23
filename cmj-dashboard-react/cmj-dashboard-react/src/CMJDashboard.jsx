import React, { useState, useMemo } from 'react';
import { cmjDataFull, positions } from './data/sampleData';
import ErrorBoundary from './components/ErrorBoundary';
import OverviewView from './components/OverviewView';
import CohortView from './components/CohortView';
import AthleteProfileView from './components/AthleteProfileView';
import DateSlicer from './components/DateSlicer';

/**
 * Main CMJ Dashboard Component
 * Manages state and routing between three main views:
 * - Overview: Position selection and top performers
 * - Cohort: Position-specific roster and stats
 * - Athlete: Individual athlete profile and trends
 */
export default function CMJDashboard() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [view, setView] = useState('overview');
  const [sortBy, setSortBy] = useState('jump');
  const [dateFilter, setDateFilter] = useState({ mode: 'all' });

  // Get date range for DateSlicer
  const dateRange = useMemo(() => {
    const dates = cmjDataFull.map(t => new Date(t.date));
    return {
      min: new Date(Math.min(...dates)).toISOString().split('T')[0],
      max: new Date(Math.max(...dates)).toISOString().split('T')[0]
    };
  }, []);

  // Filter data by date
  const filteredByDate = useMemo(() => {
    if (dateFilter.mode === 'all') return cmjDataFull;

    if (dateFilter.mode === 'single') {
      const targetDate = new Date(dateFilter.date).toISOString().split('T')[0];
      return cmjDataFull.filter(t => new Date(t.date).toISOString().split('T')[0] === targetDate);
    }

    if (dateFilter.mode === 'range') {
      const start = new Date(dateFilter.start);
      const end = new Date(dateFilter.end);
      return cmjDataFull.filter(t => {
        const testDate = new Date(t.date);
        return testDate >= start && testDate <= end;
      });
    }

    return cmjDataFull;
  }, [dateFilter]);

  // Get unique athletes (latest test only) from filtered data
  const uniqueAthletes = useMemo(() => {
    const athleteMap = new Map();
    filteredByDate.forEach(test => {
      const key = `${test.name}-${test.position}`;
      if (!athleteMap.has(key) || new Date(test.date) > new Date(athleteMap.get(key).date)) {
        athleteMap.set(key, test);
      }
    });
    return Array.from(athleteMap.values());
  }, [filteredByDate]);

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
      switch (sortBy) {
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

  // Performance rating logic
  const getPerformanceRating = (value, avg) => {
    const percentDiff = ((value - avg) / avg) * 100;
    if (percentDiff > 15) return { label: 'Excellent', color: 'bg-green-100 text-green-800 border-green-300' };
    if (percentDiff > 5) return { label: 'Good', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    if (percentDiff > -5) return { label: 'Average', color: 'bg-gray-100 text-gray-800 border-gray-300' };
    if (percentDiff > -15) return { label: 'Monitor', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    return { label: 'Needs Work', color: 'bg-red-100 text-red-800 border-red-300' };
  };

  // Event handlers
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

  // Athlete profile data
  const athleteHistory = selectedAthlete ? getAthleteHistory(selectedAthlete) : [];
  const chartData = athleteHistory
    .slice()
    .reverse()
    .map(test => ({
      date: new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Jump Height': parseFloat(test.jump_height_cm.toFixed(1)),
      'Peak Power': Math.round(test.peak_power / 100) / 10,
      'RSI': test.rsi_modified
    }));

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-baylor-green to-baylor-green-dark text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold font-agency">CMJ Performance Tracker</h1>
                <p className="text-baylor-gold-100 mt-2 text-lg">
                  Baylor University Football 2025 • Force Plate Testing
                </p>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="bg-baylor-gold text-baylor-green-dark px-3 py-1 rounded-full font-semibold">5,827 Tests</span>
                  <span className="bg-baylor-gold text-baylor-green-dark px-3 py-1 rounded-full font-semibold">112 Athletes</span>
                  <span className="bg-baylor-gold text-baylor-green-dark px-3 py-1 rounded-full font-semibold">Sep-Oct 2025</span>
                </div>
              </div>
              {view !== 'overview' && (
                <button
                  onClick={resetView}
                  className="bg-baylor-gold text-baylor-green-dark px-4 py-2 rounded-lg font-bold hover:bg-baylor-gold-dark transition-colors font-agency"
                  aria-label="Return to home"
                >
                  ← Home
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
          {/* Date Filter */}
          {view === 'overview' && (
            <DateSlicer
              onDateChange={setDateFilter}
              minDate={dateRange.min}
              maxDate={dateRange.max}
            />
          )}

          {/* Breadcrumbs */}
          {view !== 'overview' && (
            <nav className="flex items-center gap-2 text-sm bg-white rounded-lg px-4 py-3 shadow-sm" aria-label="Breadcrumb">
              <button
                onClick={resetView}
                className="text-baylor-green hover:underline font-medium"
              >
                Overview
              </button>
              {selectedPosition && (
                <>
                  <span className="text-gray-400" aria-hidden="true">›</span>
                  <button
                    onClick={() => setView('cohort')}
                    className={`${view === 'cohort' ? 'text-gray-900 font-semibold' : 'text-baylor-green hover:underline'}`}
                  >
                    {positions.find(p => p.code === selectedPosition)?.name}
                  </button>
                </>
              )}
              {selectedAthlete && (
                <>
                  <span className="text-gray-400" aria-hidden="true">›</span>
                  <span className="text-gray-900 font-semibold">{selectedAthlete.name}</span>
                </>
              )}
            </nav>
          )}

          {/* Main Content - Render appropriate view */}
          {view === 'overview' && (
            <OverviewView
              positions={positions}
              uniqueAthletes={uniqueAthletes}
              topPerformers={topPerformers}
              onPositionClick={handlePositionClick}
            />
          )}

          {view === 'cohort' && selectedPosition && (
            <CohortView
              selectedPosition={selectedPosition}
              positions={positions}
              filteredAthletes={filteredAthletes}
              positionStats={positionStats}
              sortedAthletes={sortedAthletes}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onAthleteClick={handleAthleteClick}
              getPerformanceRating={getPerformanceRating}
            />
          )}

          {view === 'athlete' && selectedAthlete && (
            <AthleteProfileView
              athlete={selectedAthlete}
              athleteHistory={athleteHistory}
              chartData={chartData}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
