"use client"

import { WorkersTable } from "@/components/admin/workers/workers-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function WorkersPage() {
  // In a real app, we would fetch this data from the API
  // const workers = await fetch('/api/workers').then(res => res.json())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Workers Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage worker records</p>
        </div>
        <Link href="/admin/workers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Worker
          </Button>
        </Link>
      </div>

      <WorkersTable />
    </div>
  )
}
