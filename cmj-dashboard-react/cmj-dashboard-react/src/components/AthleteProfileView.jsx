import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PerformanceCard from './PerformanceCard';
import MetricCard from './MetricCard';

/**
 * Individual athlete profile view
 * Shows detailed metrics, trends, and test history
 */
export default function AthleteProfileView({ athlete, athleteHistory, chartData }) {
  return (
    <>
      {/* Athlete Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{athlete.name}</h2>
            <div className="flex gap-3 mt-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-bold">
                {athlete.position}
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-bold">
                #{athlete.number}
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                {athlete.bw_kg.toFixed(1)} kg / {(athlete.bw_kg * 2.20462).toFixed(1)} lbs
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
        <PerformanceCard
          label="Jump Height"
          value={athlete.jump_height_cm}
          unit="centimeters"
          colorClass="from-blue-500 to-blue-700"
          textColorClass="text-blue-100"
        />
        <PerformanceCard
          label="Peak Power"
          value={Math.round(athlete.peak_power)}
          unit="watts"
          colorClass="from-green-500 to-green-700"
          textColorClass="text-green-100"
        />
        <PerformanceCard
          label="RSI-Modified"
          value={athlete.rsi_modified}
          unit="reactive strength"
          colorClass="from-purple-500 to-purple-700"
          textColorClass="text-purple-100"
        />
        <PerformanceCard
          label="Peak Force"
          value={Math.round(athlete.peak_force)}
          unit="newtons"
          colorClass="from-orange-500 to-orange-700"
          textColorClass="text-orange-100"
        />
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
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Jump Height"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Peak Power"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Detailed Metrics Grid */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            label="Takeoff Velocity"
            value={athlete.takeoff_velocity}
            unit="m/s"
          />
          <MetricCard
            label="Contraction Time"
            value={athlete.contraction_time}
            unit="milliseconds"
          />
          <MetricCard
            label="CM Depth"
            value={athlete.countermovement_depth}
            unit="cm"
          />
          <MetricCard
            label="Power/Weight Ratio"
            value={athlete.peak_power / athlete.bw_kg}
            unit="W/kg"
            colorClass="from-blue-50 to-blue-100"
            borderColor="border-blue-200"
            textColor="text-blue"
          />
          <MetricCard
            label="Force/BW Ratio"
            value={athlete.peak_force / (athlete.bw_kg * 9.81)}
            unit="× bodyweight"
            colorClass="from-green-50 to-green-100"
            borderColor="border-green-200"
            textColor="text-green"
          />
          <MetricCard
            label="Latest Test"
            value={new Date(athlete.date).toLocaleDateString()}
            unit=""
            colorClass="from-purple-50 to-purple-100"
            borderColor="border-purple-200"
            textColor="text-purple"
          />
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
  );
}
