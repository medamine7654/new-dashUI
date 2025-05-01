"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const departmentData = [
  { name: "Assembly", value: 95, color: "#4f46e5" },
  { name: "Quality Control", value: 45, color: "#10b981" },
  { name: "Logistics", value: 35, color: "#f59e0b" },
  { name: "Maintenance", value: 30, color: "#6366f1" },
  { name: "Administration", value: 40, color: "#ec4899" },
]

const workers = [
  {
    id: "W-1001",
    name: "Ahmed Malik",
    department: "Assembly",
    shift: "Morning",
    status: "Active",
    performance: 95,
  },
  {
    id: "W-1002",
    name: "Sofia Chen",
    department: "Quality Control",
    shift: "Night",
    status: "Active",
    performance: 92,
  },
  {
    id: "W-1003",
    name: "Carlos Rodriguez",
    department: "Logistics",
    shift: "Morning",
    status: "Active",
    performance: 88,
  },
  {
    id: "W-1004",
    name: "Fatima Al-Farsi",
    department: "Assembly",
    shift: "Evening",
    status: "On Leave",
    performance: 90,
  },
  {
    id: "W-1005",
    name: "John Smith",
    department: "Maintenance",
    shift: "Morning",
    status: "Active",
    performance: 85,
  },
]

export function WorkerStats() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">Workers by Department</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Worker Status Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">218</div>
              <p className="text-sm text-muted-foreground">Active Workers</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">27</div>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">89%</div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">92%</div>
              <p className="text-sm text-muted-foreground">Avg. Performance</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Recent Worker Data</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium">{worker.id}</TableCell>
                  <TableCell>{worker.name}</TableCell>
                  <TableCell>{worker.department}</TableCell>
                  <TableCell>{worker.shift}</TableCell>
                  <TableCell>
                    <Badge variant={worker.status === "Active" ? "default" : "secondary"}>{worker.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{worker.performance}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
