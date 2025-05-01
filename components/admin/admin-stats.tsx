"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", workers: 220, computers: 170, performance: 82 },
  { name: "Feb", workers: 230, computers: 175, performance: 85 },
  { name: "Mar", workers: 245, computers: 182, performance: 88 },
  { name: "Apr", workers: 245, computers: 182, performance: 90 },
  { name: "May", workers: 245, computers: 182, performance: 89 },
  { name: "Jun", workers: 245, computers: 182, performance: 91 },
]

export function AdminStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="workers" name="Workers" stroke="#4f46e5" activeDot={{ r: 8 }} />
        <Line yAxisId="left" type="monotone" dataKey="computers" name="Computers" stroke="#10b981" />
        <Line yAxisId="right" type="monotone" dataKey="performance" name="Performance %" stroke="#f43f5e" />
      </LineChart>
    </ResponsiveContainer>
  )
}
