"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Week 1",
    productivity: 85,
    efficiency: 78,
    downtime: 12,
  },
  {
    name: "Week 2",
    productivity: 88,
    efficiency: 82,
    downtime: 10,
  },
  {
    name: "Week 3",
    productivity: 91,
    efficiency: 85,
    downtime: 8,
  },
  {
    name: "Week 4",
    productivity: 89,
    efficiency: 83,
    downtime: 9,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="productivity" name="Productivity %" fill="#4f46e5" />
        <Bar dataKey="efficiency" name="Efficiency %" fill="#10b981" />
        <Bar dataKey="downtime" name="Downtime %" fill="#f43f5e" />
      </BarChart>
    </ResponsiveContainer>
  )
}
