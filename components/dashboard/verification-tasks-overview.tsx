"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { VerificationTask, fetchVerificationTasks } from "@/lib/api"
import { useEffect, useState } from "react"

export function VerificationTasksOverview() {
  const [tasks, setTasks] = useState<VerificationTask[]>([])
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
        const data = await fetchVerificationTasks()
        setTasks(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load verification tasks')
      } finally {
        setLoading(false)
      }
    }

    loadData()
    const interval = setInterval(loadData, 5 * 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "secondary"
      case "Scheduled":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  // Data for the bar chart
  const taskData = tasks.reduce((acc, task) => {
    const priorityIndex = acc.findIndex(item => item.name === task.priority)
    if (priorityIndex >= 0) {
      acc[priorityIndex].tasks++
    } else {
      acc.push({
        name: task.priority,
        tasks: 1
      })
    }
    return acc
  }, [] as { name: string; tasks: number }[])

  // Filter tasks that are scheduled or in progress
  const pendingTasks = tasks.filter((task) => task.status === "Scheduled" || task.status === "In Progress")

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">Verification Tasks by Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" name="Tasks" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Verification Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <p className="text-sm text-muted-foreground">Critical Priority</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <p className="text-sm text-muted-foreground">Issues Found</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Pending Verification Tasks</h3>
        <div className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Computer</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Scheduled Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.taskName}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.assigneeName}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>{formatTime(task.scheduledTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
