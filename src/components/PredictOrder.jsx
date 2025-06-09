import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PredictOrder = () => {
  // Dummy data for weekly predictions, now with 7 daily data points per week
  // 'expectedY' (red) will have a slight downtrend wavy pattern.
  // 'projectedY' (orange) will have a slight progressive wavy pattern.
  // 'wavyBlueLineY' (blue) remains as the base wavy line.
  const weeklyPredictionData = {
    "Week 1": [
      { x: 1, dayName: 'Mon', expectedY: 6.0, projectedY: 3.5, wavyBlueLineY: 3.5 },
      { x: 2, dayName: 'Tue', expectedY: 5.8, projectedY: 4.0, wavyBlueLineY: 4.5 },
      { x: 3, dayName: 'Wed', expectedY: 5.5, projectedY: 3.8, wavyBlueLineY: 5.5 },
      { x: 4, dayName: 'Thu', expectedY: 5.3, projectedY: 4.3, wavyBlueLineY: 4.0 },
      { x: 5, dayName: 'Fri', expectedY: 5.0, projectedY: 4.1, wavyBlueLineY: 3.0 },
      { x: 6, dayName: 'Sat', expectedY: 4.8, projectedY: 4.6, wavyBlueLineY: 4.0 },
      { x: 7, dayName: 'Sun', expectedY: 4.5, projectedY: 4.4, wavyBlueLineY: 5.0 },
    ],
    "Week 2": [
      { x: 1, dayName: 'Mon', expectedY: 6.2, projectedY: 3.8, wavyBlueLineY: 4.0 },
      { x: 2, dayName: 'Tue', expectedY: 6.0, projectedY: 4.3, wavyBlueLineY: 5.0 },
      { x: 3, dayName: 'Wed', expectedY: 5.7, projectedY: 4.1, wavyBlueLineY: 3.8 },
      { x: 4, dayName: 'Thu', expectedY: 5.5, projectedY: 4.6, wavyBlueLineY: 4.8 },
      { x: 5, dayName: 'Fri', expectedY: 5.2, projectedY: 4.4, wavyBlueLineY: 5.8 },
      { x: 6, dayName: 'Sat', expectedY: 5.0, projectedY: 4.9, wavyBlueLineY: 4.5 },
      { x: 7, dayName: 'Sun', expectedY: 4.7, projectedY: 4.7, wavyBlueLineY: 3.5 },
    ],
    "Week 3": [
      { x: 1, dayName: 'Mon', expectedY: 5.8, projectedY: 4.0, wavyBlueLineY: 5.0 },
      { x: 2, dayName: 'Tue', expectedY: 5.6, projectedY: 4.5, wavyBlueLineY: 4.0 },
      { x: 3, dayName: 'Wed', expectedY: 5.3, projectedY: 4.3, wavyBlueLineY: 3.0 },
      { x: 4, dayName: 'Thu', expectedY: 5.1, projectedY: 4.8, wavyBlueLineY: 4.0 },
      { x: 5, dayName: 'Fri', expectedY: 4.8, projectedY: 4.6, wavyBlueLineY: 5.0 },
      { x: 6, dayName: 'Sat', expectedY: 4.6, projectedY: 5.1, wavyBlueLineY: 4.5 },
      { x: 7, dayName: 'Sun', expectedY: 4.3, projectedY: 4.9, wavyBlueLineY: 3.5 },
    ],
    // NEW: Week 4 data
    "Week 4": [
      { x: 1, dayName: 'Mon', expectedY: 5.5, projectedY: 4.2, wavyBlueLineY: 4.5 },
      { x: 2, dayName: 'Tue', expectedY: 5.3, projectedY: 4.7, wavyBlueLineY: 5.5 },
      { x: 3, dayName: 'Wed', expectedY: 5.0, projectedY: 4.5, wavyBlueLineY: 4.0 },
      { x: 4, dayName: 'Thu', expectedY: 4.8, projectedY: 5.0, wavyBlueLineY: 3.0 },
      { x: 5, dayName: 'Fri', expectedY: 4.5, projectedY: 4.8, wavyBlueLineY: 4.0 },
      { x: 6, dayName: 'Sat', expectedY: 4.3, projectedY: 5.3, wavyBlueLineY: 5.0 },
      { x: 7, dayName: 'Sun', expectedY: 4.0, projectedY: 5.1, wavyBlueLineY: 4.5 },
    ],
  };

  const [currentWeek, setCurrentWeek] = useState("Week 1");
  const data = weeklyPredictionData[currentWeek];
  const weeks = Object.keys(weeklyPredictionData);

  return (
    <div className="card--container" style={{ width: '100%', height: '500px', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Monthly Order Prediction Graph (Week: {currentWeek})</h1>

      {/* Week Selector */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h3>Select Week:</h3>
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => setCurrentWeek(week)}
            style={{
              padding: "10px 15px",
              margin: "0 5px",
              cursor: "pointer",
              backgroundColor: currentWeek === week ? "#007bff" : "#f0f0f0",
              color: currentWeek === week ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {week}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dayName"
            type="category"
            label={{ value: "Day of Week", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            type="number"
            domain={[3, 7]} // Adjusted Y-axis domain to fit new data range
            ticks={[3, 4, 5, 6, 7]} // Adjusted Y-axis ticks
            allowDecimals={true}
            label={{ value: "Order Value", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />

          {/* Blue line, now wavy */}
          <Line
            type="monotone"
            dataKey="wavyBlueLineY"
            stroke="#4682B4"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
            name="Wavy Trend"
          />

          {/* Red line for Expected Graph (wavy with downtrend) */}
          <Line
            type="monotone"
            dataKey="expectedY"
            stroke="#FF0000"
            strokeWidth={3}
            dot={false}
            name="Expected Graph"
            isAnimationActive={false}
          />

          {/* Orange line for Projected Graph (wavy with progressive trend) */}
          <Line
            type="monotone"
            dataKey="projectedY"
            stroke="#FFA500"
            strokeWidth={3}
            dot={false}
            name="Projected Graph"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictOrder;
