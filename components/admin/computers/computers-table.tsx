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
import { computers } from "@/lib/data"

export function ComputersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [filteredComputers, setFilteredComputers] = useState(computers)

  useEffect(() => {
    // Filter computers based on search term and filters
    const filtered = computers.filter((computer) => {
      const matchesSearch =
        computer.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        computer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        computer.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        computer.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || computer.status === statusFilter
      const matchesLocation = locationFilter === "all" || computer.location === locationFilter

      return matchesSearch && matchesStatus && matchesLocation
    })

    setFilteredComputers(filtered)
  }, [searchTerm, statusFilter, locationFilter])

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle>Computers</CardTitle>
        <CardDescription>A list of all computer systems in your factory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search computers..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("Online")}>Online</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Offline")}>Offline</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Maintenance")}>Maintenance</DropdownMenuItem>

                <DropdownMenuLabel className="mt-2">Filter by Location</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocationFilter("all")}>All Locations</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Assembly Line A")}>
                  Assembly Line A
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Assembly Line B")}>
                  Assembly Line B
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Quality Control")}>
                  Quality Control
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocationFilter("Logistics Office")}>
                  Logistics Office
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
                <TableHead>Hostname</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU Usage</TableHead>
                <TableHead>Memory Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComputers.map((computer) => (
                <TableRow key={computer.id}>
                  <TableCell className="font-medium">{computer.id}</TableCell>
                  <TableCell>{computer.hostname}</TableCell>
                  <TableCell>{computer.ipAddress}</TableCell>
                  <TableCell>{computer.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        computer.status === "Online"
                          ? "default"
                          : computer.status === "Maintenance"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {computer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-[60px] rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${
                            computer.cpuUsage < 50
                              ? "bg-green-500"
                              : computer.cpuUsage < 80
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${computer.cpuUsage}%` }}
                        />
                      </div>
                      <span className="text-sm">{computer.cpuUsage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-[60px] rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${
                            computer.memoryUsage < 50
                              ? "bg-green-500"
                              : computer.memoryUsage < 80
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${computer.memoryUsage}%` }}
                        />
                      </div>
                      <span className="text-sm">{computer.memoryUsage}%</span>
                    </div>
                  </TableCell>
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
                          <Link href={`/admin/computers/${computer.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/computers/${computer.id}/edit`}>Edit Computer</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Run Verification</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Shutdown</DropdownMenuItem>
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
            Showing <strong>1</strong> to <strong>{filteredComputers.length}</strong> of{" "}
            <strong>{computers.length}</strong> computers
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
