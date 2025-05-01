"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const usageData = [
  { time: "6:00", usage: 45 },
  { time: "7:00", usage: 52 },
  { time: "8:00", usage: 78 },
  { time: "9:00", usage: 86 },
  { time: "10:00", usage: 90 },
  { time: "11:00", usage: 92 },
  { time: "12:00", usage: 85 },
  { time: "13:00", usage: 72 },
  { time: "14:00", usage: 80 },
]

const computers = [
  {
    id: "PC-1001",
    location: "Assembly Line A",
    status: "Online",
    lastMaintenance: "2023-03-15",
    cpuUsage: 65,
    memoryUsage: 72,
  },
  {
    id: "PC-1002",
    location: "Quality Control",
    status: "Online",
    lastMaintenance: "2023-03-10",
    cpuUsage: 45,
    memoryUsage: 58,
  },
  {
    id: "PC-1003",
    location: "Logistics Office",
    status: "Offline",
    lastMaintenance: "2023-02-28",
    cpuUsage: 0,
    memoryUsage: 0,
  },
  {
    id: "PC-1004",
    location: "Assembly Line B",
    status: "Online",
    lastMaintenance: "2023-03-12",
    cpuUsage: 78,
    memoryUsage: 85,
  },
  {
    id: "PC-1005",
    location: "Manager's Office",
    status: "Online",
    lastMaintenance: "2023-03-05",
    cpuUsage: 32,
    memoryUsage: 45,
  },
]

export function ComputerStats() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">Computer Usage Today</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: "Usage %", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Computer Status Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">165</div>
              <p className="text-sm text-muted-foreground">Online Computers</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">17</div>
              <p className="text-sm text-muted-foreground">Offline Computers</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">91%</div>
              <p className="text-sm text-muted-foreground">Operational Rate</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">68%</div>
              <p className="text-sm text-muted-foreground">Avg. CPU Usage</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Computer Systems Status</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>CPU Usage</TableHead>
                <TableHead>Memory Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {computers.map((computer) => (
                <TableRow key={computer.id}>
                  <TableCell className="font-medium">{computer.id}</TableCell>
                  <TableCell>{computer.location}</TableCell>
                  <TableCell>
                    <Badge variant={computer.status === "Online" ? "default" : "destructive"}>{computer.status}</Badge>
                  </TableCell>
                  <TableCell>{computer.lastMaintenance}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={computer.cpuUsage} className="h-2 w-[60px]" />
                      <span className="text-sm">{computer.cpuUsage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={computer.memoryUsage} className="h-2 w-[60px]" />
                      <span className="text-sm">{computer.memoryUsage}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
