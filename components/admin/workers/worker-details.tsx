"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Trash2, Clock, CalendarDays, BarChart3 } from "lucide-react"
import Link from "next/link"
import { workers } from "@/lib/data"

interface WorkerDetailsProps {
  workerId: string
}

export function WorkerDetails({ workerId }: WorkerDetailsProps) {
  const [worker, setWorker] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // fetch(`/api/workers/${workerId}`).then(res => res.json()).then(data => {
    //   setWorker(data)
    //   setLoading(false)
    // })

    // For demo purposes, we'll use mock data
    const foundWorker = workers.find((w) => w.id === workerId)
    setWorker(foundWorker)
    setLoading(false)
  }, [workerId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!worker) {
    return <div>Worker not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/workers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{worker.name}</h1>
            <p className="text-muted-foreground">
              {worker.id} • {worker.position}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/workers/${worker.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Worker Information</CardTitle>
            <CardDescription>Personal and employment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p>{worker.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Position</p>
                <p>{worker.position}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge
                  variant={
                    worker.status === "Active" ? "default" : worker.status === "On Leave" ? "secondary" : "destructive"
                  }
                >
                  {worker.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shift</p>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{worker.shift}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hire Date</p>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  <span>{worker.hireDate}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Supervisor</p>
                <p>{worker.supervisor}</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">Performance</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      worker.performance >= 90
                        ? "bg-green-500"
                        : worker.performance >= 70
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${worker.performance}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{worker.performance}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How to reach this worker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{worker.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{worker.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{worker.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
              <p>{worker.emergencyContact}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Worker's recent activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Checked in for morning shift</p>
                    <p className="text-sm text-muted-foreground">Today at 08:45 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Completed daily production quota</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 03:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Checked out from shift</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 05:15 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Worker's performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Performance chart will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Worker Documents</CardTitle>
              <CardDescription>Contracts, certifications, and other documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Documents will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Additional information about this worker</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{worker.notes}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
