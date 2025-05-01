import { ComputersTable } from "@/components/admin/computers/computers-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function ComputersPage() {
  // In a real app, we would fetch this data from the API
  // const computers = await fetch('/api/computers').then(res => res.json())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Computers Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage computer systems</p>
        </div>
        <Link href="/admin/computers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Computer
          </Button>
        </Link>
      </div>

      <ComputersTable />
    </div>
  )
}
