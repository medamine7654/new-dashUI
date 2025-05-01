import { NextResponse } from "next/server"
import { workers } from "@/lib/data"

export async function GET() {
  // In a real app, this would fetch data from a database
  return NextResponse.json(workers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.name || !body.department || !body.shift) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `W-${1000 + workers.length + 1}`

    // Create a new worker
    const newWorker = {
      id: newId,
      name: body.name,
      department: body.department,
      shift: body.shift,
      status: body.status || "Active",
      performance: body.performance || 85,
      email: body.email,
      phone: body.phone,
      hireDate: body.hireDate || new Date().toISOString().split("T")[0],
      position: body.position,
      supervisor: body.supervisor,
      address: body.address,
      emergencyContact: body.emergencyContact,
      notes: body.notes,
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new worker

    return NextResponse.json(newWorker, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create worker" }, { status: 500 })
  }
}
