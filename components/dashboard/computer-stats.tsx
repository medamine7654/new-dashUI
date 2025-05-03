"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { Computer, fetchComputers, calculateComputerStats } from "@/lib/api"

export function ComputerStats() {
  const [computers, setComputers] = useState<Computer[]>([])
  const [stats, setStats] = useState({
    onlineCount: 0,
    offlineCount: 0,
    operationalRate: 0,
    averageCpuUsage: 0
  })
  const [usageData, setUsageData] = useState<{ time: string; usage: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const computersData = await fetchComputers()
        setComputers(computersData)
        setStats(calculateComputerStats(computersData))
        
        // Create usage data from computer CPU usage
        const currentHour = new Date().getHours()
        const usage = computersData.reduce((sum, c) => sum + c.cpu_usage, 0) / computersData.length
        setUsageData(prev => [...prev, { time: `${currentHour}:00`, usage }])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])
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
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.onlineCount}</div>
              <p className="text-sm text-muted-foreground">Online Computers</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.offlineCount}</div>
              <p className="text-sm text-muted-foreground">Offline Computers</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.operationalRate}%</div>
              <p className="text-sm text-muted-foreground">Operational Rate</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.averageCpuUsage}%</div>
              <p className="text-sm text-muted-foreground">Avg. CPU Usage</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Computer Systems Status</h3>
        <div className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Hostname</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU Usage</TableHead>
                <TableHead>Memory Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500">{error}</TableCell>
                </TableRow>
              ) : computers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No computers found</TableCell>
                </TableRow>
              ) : computers.slice(0, 5).map((computer) => (
                <TableRow key={computer.id}>
                  <TableCell className="font-medium">{computer.id}</TableCell>
                  <TableCell>{computer.hostname}</TableCell>
                  <TableCell>{computer.location}</TableCell>
                  <TableCell>
                    <Badge variant={computer.status.toLowerCase() === "online" ? "default" : "destructive"}>{computer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={computer.cpu_usage} className="h-2 w-[60px]" />
                      <span className="text-sm">{computer.cpu_usage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={computer.memory_usage} className="h-2 w-[60px]" />
                      <span className="text-sm">{computer.memory_usage}%</span>
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
