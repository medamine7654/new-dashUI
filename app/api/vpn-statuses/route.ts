import { NextResponse } from "next/server"
import { vpnStatuses } from "@/lib/data"

export async function GET() {
  // In a real app, this would fetch data from a database
  return NextResponse.json(vpnStatuses)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `VPN-${1000 + vpnStatuses.length + 1}`

    // Create a new VPN status
    const newVpnStatus = {
      id: newId,
      userId: body.userId,
      userName: body.userName,
      connectionStatus: body.connectionStatus || "Connected",
      connectionTime: body.connectionTime || new Date().toISOString(),
      disconnectionTime: body.disconnectionTime || null,
      ipAddress: body.ipAddress,
      location: body.location,
      deviceType: body.deviceType || "Workstation",
      encryptionLevel: body.encryptionLevel || "AES-256",
      protocol: body.protocol || "OpenVPN",
      bandwidth: body.bandwidth || 0,
      dataTransferred: body.dataTransferred || 0,
      notes: body.notes,
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new VPN status

    return NextResponse.json(newVpnStatus, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create VPN status" }, { status: 500 })
  }
}
