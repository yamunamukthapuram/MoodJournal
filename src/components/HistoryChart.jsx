import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Build a small dataset aggregated by day (last 14 days)
function buildSeries(entries) {
  const days = 14;
  const now = new Date();
  const map = {};

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map[key] = { date: key, count: 0, sum: 0 };
  }

  entries.forEach(e => {
    const key = e.createdAt.slice(0, 10);
    if (!map[key]) return;
    map[key].count += 1;
    map[key].sum += e.mood;
  });

  const series = Object.values(map).reverse().map(item => ({
    date: item.date.slice(5), // MM-DD
    value: item.count ? +(item.sum / item.count).toFixed(2) : null,
  }));
  return series;
}

export default function HistoryChart({ entries = [] }) {
  const data = useMemo(() => buildSeries(entries), [entries]);

  return (
    <div style={{ width: '100%', height: 220 }} className="bg-white p-3 rounded">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} allowDecimals={false} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#fb7185" fillOpacity={1} fill="url(#colorVal)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
