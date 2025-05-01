import { NextResponse } from "next/server"
import { departments } from "@/lib/data"

export async function GET() {
  // In a real app, this would fetch data from a database
  return NextResponse.json(departments)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `D-${100 + departments.length + 1}`

    // Create a new department
    const newDepartment = {
      id: newId,
      name: body.name,
      building: body.building || "Main Building",
      manager: body.manager,
      employeeCount: body.employeeCount || 0,
      description: body.description,
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new department

    return NextResponse.json(newDepartment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create department" }, { status: 500 })
  }
}
