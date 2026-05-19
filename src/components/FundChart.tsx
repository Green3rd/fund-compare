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
}

const DEFAULT_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

export default function FundChart({ data, fundCodes, colors = DEFAULT_COLORS }: FundChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <p className="text-gray-600">ไม่มีข้อมูลกราฟ</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
          labelFormatter={(value) => `วันที่: ${value}`}
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
