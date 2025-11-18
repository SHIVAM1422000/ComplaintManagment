import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SentimentTrend({ userId }) {
  const [data, setData] = useState(null);

  useEffect(()=> {
    if(!userId) return;
    axios.get(`/api/queries/user/${userId}/sentiment-trend?days=14`).then(r => {
      // transform { _id: 'YYYY-MM-DD', avgSentiment } -> { date, value }
      const formatted = r.data.trend.map(d => ({ date: d._id, value: Number(d.avgSentiment.toFixed(2)) }));
      setData(formatted);
    });
  }, [userId]);

  if(!data) return <div>Loading trend...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">Sentiment Trend (last 14 days)</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"/>
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
