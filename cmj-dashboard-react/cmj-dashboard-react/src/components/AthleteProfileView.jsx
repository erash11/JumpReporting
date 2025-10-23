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
      <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-baylor-gold">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-4xl font-bold text-baylor-green font-agency">{athlete.name}</h2>
            <div className="flex gap-3 mt-3">
              <span className="px-4 py-2 bg-baylor-green text-white rounded-lg font-bold font-agency">
                {athlete.position}
              </span>
              <span className="px-4 py-2 bg-baylor-gold-100 text-baylor-green-dark rounded-lg font-medium">
                {athlete.bw_kg.toFixed(1)} kg / {(athlete.bw_kg * 2.20462).toFixed(1)} lbs
              </span>
              <span className="px-4 py-2 bg-baylor-green-50 text-baylor-green rounded-lg font-medium">
                {athleteHistory.length} tests
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Output Metrics */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-baylor-gold">
        <h3 className="text-xl font-bold text-baylor-green mb-4 font-agency">Output Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PerformanceCard
            label="Jump Height"
            value={athlete.jump_height_cm}
            unit="centimeters"
            colorClass="from-baylor-gold to-baylor-gold-dark"
            textColorClass="text-baylor-green-dark"
          />
          <PerformanceCard
            label="Peak Power"
            value={Math.round(athlete.peak_power)}
            unit="watts"
            colorClass="from-baylor-green to-baylor-green-dark"
            textColorClass="text-white"
          />
          <PerformanceCard
            label="Peak Force"
            value={Math.round(athlete.peak_force)}
            unit="newtons"
            colorClass="from-baylor-gold-600 to-baylor-gold-700"
            textColorClass="text-white"
          />
        </div>
      </div>

      {/* Strategy Metrics */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-baylor-green">
        <h3 className="text-xl font-bold text-baylor-green mb-4 font-agency">Strategy Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PerformanceCard
            label="RSI-Modified"
            value={athlete.rsi_modified}
            unit="reactive strength"
            colorClass="from-baylor-green to-baylor-green-dark"
            textColorClass="text-white"
          />
          <PerformanceCard
            label="CM Depth"
            value={athlete.countermovement_depth}
            unit="centimeters"
            colorClass="from-baylor-green-600 to-baylor-green-700"
            textColorClass="text-white"
          />
        </div>
      </div>

      {/* Performance Trends Chart */}
      {athleteHistory.length > 1 && (
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-baylor-gold">
          <h3 className="text-2xl font-bold text-baylor-green mb-6 font-agency">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#FECB00" />
              <YAxis yAxisId="right" orientation="right" stroke="#003015" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '2px solid #003015', borderRadius: '8px' }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Jump Height"
                stroke="#FECB00"
                strokeWidth={3}
                dot={{ r: 5, fill: '#FECB00' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Peak Power"
                stroke="#003015"
                strokeWidth={3}
                dot={{ r: 5, fill: '#003015' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance Drivers */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-baylor-gold">
        <h3 className="text-xl font-bold text-baylor-green mb-4 font-agency">Performance Drivers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            label="Takeoff Velocity"
            value={athlete.takeoff_velocity}
            unit="m/s"
            colorClass="from-baylor-gold-50 to-baylor-gold-100"
            borderColor="border-baylor-gold-200"
            textColor="text-baylor-gold"
          />
          <MetricCard
            label="Contraction Time"
            value={athlete.contraction_time}
            unit="milliseconds"
            colorClass="from-baylor-gold-50 to-baylor-gold-100"
            borderColor="border-baylor-gold-200"
            textColor="text-baylor-gold"
          />
        </div>
      </div>

      {/* Derived Metrics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-baylor-green mb-4 font-agency">Derived Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Power/Weight Ratio"
            value={athlete.peak_power / athlete.bw_kg}
            unit="W/kg"
            colorClass="from-baylor-green-50 to-baylor-green-100"
            borderColor="border-baylor-green-200"
            textColor="text-baylor-green"
          />
          <MetricCard
            label="Force/BW Ratio"
            value={athlete.peak_force / (athlete.bw_kg * 9.81)}
            unit="× bodyweight"
            colorClass="from-baylor-gold-50 to-baylor-gold-100"
            borderColor="border-baylor-gold-200"
            textColor="text-baylor-gold"
          />
          <MetricCard
            label="Latest Test"
            value={new Date(athlete.date).toLocaleDateString()}
            unit=""
            colorClass="from-baylor-green-50 to-baylor-green-100"
            borderColor="border-baylor-green-200"
            textColor="text-baylor-green"
          />
        </div>
      </div>

      {/* Test History */}
      <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-baylor-green">
        <h3 className="text-2xl font-bold text-baylor-green mb-6 font-agency">Test History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-baylor-green bg-baylor-green-50">
                <th className="text-left py-3 px-4 font-bold text-baylor-green font-agency">Date</th>
                <th className="text-right py-3 px-4 font-bold text-baylor-green font-agency">Jump (cm)</th>
                <th className="text-right py-3 px-4 font-bold text-baylor-green font-agency">Power (W)</th>
                <th className="text-right py-3 px-4 font-bold text-baylor-green font-agency">Force (N)</th>
                <th className="text-right py-3 px-4 font-bold text-baylor-green font-agency">RSI</th>
                <th className="text-right py-3 px-4 font-bold text-baylor-green font-agency">Velocity</th>
              </tr>
            </thead>
            <tbody>
              {athleteHistory.map((test, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-baylor-green-50">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {new Date(test.date).toLocaleDateString()}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-baylor-gold-700 font-agency">
                    {test.jump_height_cm.toFixed(1)}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-baylor-green font-agency">
                    {Math.round(test.peak_power)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {Math.round(test.peak_force)}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-baylor-gold-700 font-agency">
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
