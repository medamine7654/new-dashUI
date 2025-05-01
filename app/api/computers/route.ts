import { NextResponse } from "next/server"
import { computers } from "@/lib/data"

export async function GET() {
  // In a real app, this would fetch data from a database
  return NextResponse.json(computers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `PC-${1000 + computers.length + 1}`

    // Create a new computer
    const newComputer = {
      id: newId,
      location: body.location,
      status: body.status || "Online",
      lastMaintenance: body.lastMaintenance || new Date().toISOString().split("T")[0],
      cpuUsage: body.cpuUsage || 0,
      memoryUsage: body.memoryUsage || 0,
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new computer

    return NextResponse.json(newComputer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create computer" }, { status: 500 })
  }
}
