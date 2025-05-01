import { NextResponse } from "next/server"
import { workers } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the worker by ID
  const worker = workers.find((w) => w.id === id)

  if (!worker) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 })
  }

  return NextResponse.json(worker)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find the worker by ID
    const workerIndex = workers.findIndex((w) => w.id === id)

    if (workerIndex === -1) {
      return NextResponse.json({ error: "Worker not found" }, { status: 404 })
    }

    // Update the worker
    const updatedWorker = {
      ...workers[workerIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    // In a real app, this would update the database
    // For now, we'll just return the updated worker

    return NextResponse.json(updatedWorker)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update worker" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the worker by ID
  const workerIndex = workers.findIndex((w) => w.id === id)

  if (workerIndex === -1) {
    return NextResponse.json({ error: "Worker not found" }, { status: 404 })
  }

  // In a real app, this would delete from the database
  // For now, we'll just return success

  return NextResponse.json({ success: true })
}
