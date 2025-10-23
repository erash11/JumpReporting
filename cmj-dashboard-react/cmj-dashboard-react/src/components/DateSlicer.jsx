import React, { useState } from 'react';

/**
 * Date Slicer Component
 * Allows filtering data by specific date or date range
 */
export default function DateSlicer({ onDateChange, minDate, maxDate }) {
  const [mode, setMode] = useState('all'); // 'all', 'single', 'range'
  const [singleDate, setSingleDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    if (mode === 'all') {
      onDateChange({ mode: 'all' });
    } else if (mode === 'single' && singleDate) {
      onDateChange({ mode: 'single', date: singleDate });
    } else if (mode === 'range' && startDate && endDate) {
      onDateChange({ mode: 'range', start: startDate, end: endDate });
    }
  };

  const handleClear = () => {
    setSingleDate('');
    setStartDate('');
    setEndDate('');
    setMode('all');
    onDateChange({ mode: 'all' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-baylor-green">
      <h3 className="text-lg font-bold text-baylor-green mb-3 font-agency">Date Filter</h3>

      {/* Mode Selection */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'all'
              ? 'bg-baylor-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Dates
        </button>
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'single'
              ? 'bg-baylor-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Single Date
        </button>
        <button
          onClick={() => setMode('range')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'range'
              ? 'bg-baylor-green text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Date Range
        </button>
      </div>

      {/* Single Date Picker */}
      {mode === 'single' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={singleDate}
            onChange={(e) => setSingleDate(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baylor-green"
          />
        </div>
      )}

      {/* Date Range Pickers */}
      {mode === 'range' && (
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate}
              max={endDate || maxDate}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baylor-green"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || minDate}
              max={maxDate}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baylor-green"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {mode !== 'all' && (
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-baylor-gold text-baylor-green-dark rounded-lg font-bold hover:bg-baylor-gold-dark transition-colors"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
