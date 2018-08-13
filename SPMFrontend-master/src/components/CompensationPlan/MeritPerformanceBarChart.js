import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class MeritPerformanceBarChart extends React.Component {
  render() {
    const data = [
      { name: '1', EUR: 50, JPY: 20, USD: 70 },
      { name: '2', EUR: 70, JPY: 60, USD: 90 },
      { name: '3', EUR: 30, JPY: 60, USD: 50 }];
    return (
      <BarChart
        width={430}
        height={200}
        data={data}
        margin={{ top: 20, left: 0, right: 50, bottom: 5 }}
      >
        <XAxis dataKey="name" fontFamily="Arial, sans-serif" fontSize="12px" />
        <YAxis fontFamily="Arial, sans-serif" fontSize="12px" />
        <Tooltip />
        <Legend fontFamily="Arial, sans-serif" fontSize="12px" />
        <Bar dataKey="EUR" fill="#f44e29" barSize={10} />
        <Bar dataKey="JPY" fill="#8d1f1b" barSize={10} />
        <Bar dataKey="USD" fill="#ffb642" barSize={10} />
      </BarChart>
    );
  }
}

export default MeritPerformanceBarChart;
