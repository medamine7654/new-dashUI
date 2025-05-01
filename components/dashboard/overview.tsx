"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { productivityData } from "@/lib/data"

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={productivityData}>
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
