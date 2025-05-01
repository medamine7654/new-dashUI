"use client"

import { WorkerForm } from "@/components/admin/workers/worker-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewWorkerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/workers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Worker</h1>
          <p className="text-muted-foreground">Create a new worker record</p>
        </div>
      </div>

      <WorkerForm />
    </div>
  )
}
