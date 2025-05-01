import { NextResponse } from "next/server"
import { userVerifications } from "@/lib/data"

export async function GET() {
  // In a real app, this would fetch data from a database
  return NextResponse.json(userVerifications)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.userId || !body.computerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `UV-${1000 + userVerifications.length + 1}`

    // Create a new user verification
    const newUserVerification = {
      id: newId,
      userId: body.userId,
      userName: body.userName,
      computerId: body.computerId,
      loginStatus: body.loginStatus || "Active",
      loginTime: body.loginTime || new Date().toISOString(),
      lastActivityTime: body.lastActivityTime || new Date().toISOString(),
      adminRights: body.adminRights || false,
      accessLevel: body.accessLevel || "Standard",
      ipAddress: body.ipAddress,
      sessionDuration: body.sessionDuration || 0,
      notes: body.notes,
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new user verification

    return NextResponse.json(newUserVerification, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user verification" }, { status: 500 })
  }
}
