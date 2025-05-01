import { NextResponse } from "next/server"
import { verificationTasks } from "@/lib/data"

export async function GET() {
  // In a real app, this would fetch data from a database
  return NextResponse.json(verificationTasks)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.taskName || !body.computerId || !body.assignedTo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `VT-${1000 + verificationTasks.length + 1}`

    // Create a new verification task
    const newVerificationTask = {
      id: newId,
      taskName: body.taskName,
      computerId: body.computerId,
      computerName: body.computerName,
      assignedTo: body.assignedTo,
      assigneeName: body.assigneeName,
      status: body.status || "Scheduled",
      priority: body.priority || "Medium",
      scheduledTime: body.scheduledTime || new Date().toISOString(),
      startTime: body.startTime || null,
      completionTime: body.completionTime || null,
      verificationResult: body.verificationResult || null,
      issuesFound: body.issuesFound || null,
      actionsTaken: body.actionsTaken || null,
      nextScheduledTime: body.nextScheduledTime || null,
      notes: body.notes,
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new verification task

    return NextResponse.json(newVerificationTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create verification task" }, { status: 500 })
  }
}
