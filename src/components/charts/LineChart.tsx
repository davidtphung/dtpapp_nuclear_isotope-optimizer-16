
import { useMemo } from 'react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface DataPoint {
  date: string;
  [key: string]: number | string;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    color: string;
    name?: string;
  }[];
  xAxisDataKey?: string;
  height?: number;
  tooltip?: boolean;
  grid?: boolean;
  legend?: boolean;
}

const LineChart = ({
  data,
  lines,
  xAxisDataKey = 'date',
  height = 300,
  tooltip = true,
  grid = true,
  legend = true
}: LineChartProps) => {
  const formattedData = useMemo(() => {
    return data.map(item => ({
      ...item,
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fontSize: 12 }} 
          stroke="#888"
        />
        <YAxis tick={{ fontSize: 12 }} stroke="#888" />
        {tooltip && <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }} 
        />}
        {legend && <Legend verticalAlign="top" height={36} />}
        
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name || line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
