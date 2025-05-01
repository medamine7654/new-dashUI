import { VerificationTasksTable } from "@/components/admin/verification-tasks/verification-tasks-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function VerificationTasksPage() {
  // In a real app, we would fetch this data from the API
  // const verificationTasks = await fetch('/api/verification-tasks').then(res => res.json())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verification Tasks</h1>
          <p className="text-muted-foreground">Schedule and track verification operations</p>
        </div>
        <Link href="/admin/verification-tasks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </Link>
      </div>

      <VerificationTasksTable />
    </div>
  )
}
