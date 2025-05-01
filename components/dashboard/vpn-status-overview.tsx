"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { vpnStatuses } from "@/lib/data"

export function VpnStatusOverview() {
  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Data for the pie chart
  const locationData = [
    { name: "Factory HQ", value: 1, color: "#4f46e5" },
    { name: "Home Office", value: 1, color: "#10b981" },
    { name: "Satellite Office", value: 1, color: "#f59e0b" },
  ]

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
                  <TableCell className="font-medium">{vpnStatus.userName}</TableCell>
                  <TableCell>
                    <Badge variant="default">{vpnStatus.connectionStatus}</Badge>
                  </TableCell>
                  <TableCell>{vpnStatus.ipAddress}</TableCell>
                  <TableCell>{vpnStatus.location}</TableCell>
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
