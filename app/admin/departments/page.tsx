import { DepartmentsTable } from "@/components/admin/departments/departments-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function DepartmentsPage() {
  // In a real app, we would fetch this data from the API
  // const departments = await fetch('/api/departments').then(res => res.json())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Departments Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage departments</p>
        </div>
        <Link href="/admin/departments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </Link>
      </div>

      <DepartmentsTable />
    </div>
  )
}
