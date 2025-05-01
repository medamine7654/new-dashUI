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
import { userVerifications } from "@/lib/data"

export function UserVerificationsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [adminFilter, setAdminFilter] = useState("all")
  const [filteredVerifications, setFilteredVerifications] = useState(userVerifications)

  useEffect(() => {
    // Filter user verifications based on search term and filters
    const filtered = userVerifications.filter((verification) => {
      const matchesSearch =
        verification.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verification.computerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verification.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || verification.loginStatus === statusFilter
      const matchesAdmin =
        adminFilter === "all" ||
        (adminFilter === "admin" && verification.adminRights) ||
        (adminFilter === "standard" && !verification.adminRights)

      return matchesSearch && matchesStatus && matchesAdmin
    })

    setFilteredVerifications(filtered)
  }, [searchTerm, statusFilter, adminFilter])

  const formatTime = (timestamp: string) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle>User Verifications</CardTitle>
        <CardDescription>Monitor user login status and admin rights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search verifications..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>Inactive</DropdownMenuItem>

                <DropdownMenuLabel className="mt-2">Filter by Rights</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setAdminFilter("all")}>All Users</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAdminFilter("admin")}>Admin Rights</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAdminFilter("standard")}>Standard Rights</DropdownMenuItem>
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
                <TableHead>Computer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Login Time</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell className="font-medium">{verification.id}</TableCell>
                  <TableCell>{verification.userName}</TableCell>
                  <TableCell>{verification.computerId}</TableCell>
                  <TableCell>
                    <Badge variant={verification.loginStatus === "Active" ? "default" : "secondary"}>
                      {verification.loginStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatTime(verification.loginTime)}</TableCell>
                  <TableCell>{formatTime(verification.lastActivityTime)}</TableCell>
                  <TableCell>
                    <Badge variant={verification.adminRights ? "destructive" : "outline"}>
                      {verification.accessLevel}
                    </Badge>
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
                          <Link href={`/admin/user-verifications/${verification.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/user-verifications/${verification.id}/edit`}>Edit Verification</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Terminate Session</DropdownMenuItem>
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
            Showing <strong>1</strong> to <strong>{filteredVerifications.length}</strong> of{" "}
            <strong>{userVerifications.length}</strong> verifications
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
