"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter } from "lucide-react"
import Link from "next/link"
import { vpnStatuses } from "@/lib/data"

export function VpnStatusTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [filteredVpnStatuses, setFilteredVpnStatuses] = useState(vpnStatuses)

  useEffect(() => {
    // Filter VPN statuses based on search term and filters
    const filtered = vpnStatuses.filter((vpnStatus) => {
      const matchesSearch =
        vpnStatus.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vpnStatus.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vpnStatus.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || vpnStatus.connectionStatus === statusFilter
      const matchesLocation = locationFilter === "all" || vpnStatus.location === locationFilter

      return matchesSearch && matchesStatus && matchesLocation
    })

    setFilteredVpnStatuses(filtered)
  }, [searchTerm, statusFilter, locationFilter])

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle>VPN Status</CardTitle>
        <CardDescription>Monitor VPN connections and activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search VPN connections..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Connected")}>Connected</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Disconnected")}>Disconnected</DropdownMenuItem>

                <DropdownMenuLabel className="mt-2">Filter by Location</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocationFilter("all")}>All Locations</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Factory HQ")}>Factory HQ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Home Office")}>Home Office</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Remote Site")}>Remote Site</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Satellite Office")}>
                  Satellite Office
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Connection Time</TableHead>
                <TableHead>Bandwidth</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVpnStatuses.map((vpnStatus) => (
                <TableRow key={vpnStatus.id}>
                  <TableCell className="font-medium">{vpnStatus.id}</TableCell>
                  <TableCell>{vpnStatus.userName}</TableCell>
                  <TableCell>
                    <Badge variant={vpnStatus.connectionStatus === "Connected" ? "default" : "secondary"}>
                      {vpnStatus.connectionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{vpnStatus.ipAddress}</TableCell>
                  <TableCell>{vpnStatus.location}</TableCell>
                  <TableCell>{formatTime(vpnStatus.connectionTime)}</TableCell>
                  <TableCell>{vpnStatus.bandwidth} Mbps</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/vpn-status/${vpnStatus.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/vpn-status/${vpnStatus.id}/edit`}>Edit Connection</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Disconnect</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>{filteredVpnStatuses.length}</strong> of{" "}
            <strong>{vpnStatuses.length}</strong> VPN connections
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
