"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

interface FundChartProps {
  data: ChartDataPoint[];
  fundCodes: string[];
  colors?: string[];
  isNormalized?: boolean;
}

const DEFAULT_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

function normalizeData(data: ChartDataPoint[], fundCodes: string[]): ChartDataPoint[] {
  if (data.length === 0) return data;

  const firstDataPoint = data[0];
  const baseValues: Record<string, number> = {};

  fundCodes.forEach((code) => {
    const firstValue = firstDataPoint[code];
    if (typeof firstValue === "number" && firstValue !== 0) {
      baseValues[code] = firstValue;
    }
  });

  return data.map((point) => {
    const normalizedPoint: ChartDataPoint = { date: point.date };
    fundCodes.forEach((code) => {
      const value = point[code];
      const baseValue = baseValues[code];
      
      if (typeof value === "number" && baseValue) {
        normalizedPoint[code] = ((value - baseValue) / baseValue) * 100;
      } else {
        normalizedPoint[code] = value;
      }
    });
    return normalizedPoint;
  });
}

export default function FundChart({ data, fundCodes, colors = DEFAULT_COLORS, isNormalized = false }: FundChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <p className="text-gray-600">ไม่มีข้อมูลกราฟ</p>
      </div>
    );
  }

  const chartData = isNormalized ? normalizeData(data, fundCodes) : data;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => isNormalized ? `${value.toFixed(0)}%` : value.toFixed(2)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
          labelFormatter={(value) => `วันที่: ${value}`}
          formatter={(value: any) => 
            typeof value === "number"
              ? (isNormalized ? `${value.toFixed(2)}%` : value.toFixed(4))
              : "N/A"
          }
        />
        <Legend />
        {fundCodes.map((code, index) => (
          <Line
            key={code}
            type="monotone"
            dataKey={code}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name={code}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
