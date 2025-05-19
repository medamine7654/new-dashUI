"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { VPNStatus, fetchVPNStatuses } from "@/lib/api"
import { useEffect, useState } from "react"

export function VpnStatusOverview() {
  const [vpnStatuses, setVpnStatuses] = useState<VPNStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchVPNStatuses()
        setVpnStatuses(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load VPN data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
    const interval = setInterval(loadData, 5 * 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  // Calculate location data for pie chart
  const locationData = vpnStatuses.reduce((acc, status) => {
    const locationIndex = acc.findIndex(item => item.name === status.location)
    if (locationIndex >= 0) {
      acc[locationIndex].value++
    } else {
      acc.push({
        name: status.location,
        value: 1,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}` // Generate random color
      })
    }
    return acc
  }, [] as { name: string; value: number; color: string }[])

  const activeVpnConnections = vpnStatuses.filter((status) => status.connectionStatus === "Connected")

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">VPN Connections by Location</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {locationData.map((entry, index) => (
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
          <h3 className="text-lg font-medium mb-4">VPN Status Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-sm text-muted-foreground">Active Connections</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <p className="text-sm text-muted-foreground">Disconnected</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">21.2</div>
              <p className="text-sm text-muted-foreground">Avg. Bandwidth (Mbps)</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">579</div>
              <p className="text-sm text-muted-foreground">Total Data (MB)</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Active VPN Connections</h3>
        <div className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Connection Time</TableHead>
                <TableHead>Bandwidth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeVpnConnections.map((vpnStatus) => (
                <TableRow key={vpnStatus.id}>
                  <TableCell className="font-medium">{vpnStatus.user_name}</TableCell>
                  <TableCell>
                    <Badge variant="default">{vpnStatus.connectionStatus}</Badge>
                  </TableCell>
                  <TableCell>{vpnStatus.ipAddress}</TableCell>
                  <TableCell>{vpnStatus.user_name}</TableCell>
                  <TableCell>{formatTime(vpnStatus.connectionTime)}</TableCell>
                  <TableCell>{vpnStatus.bandwidth} Mbps</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
