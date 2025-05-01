import { UserVerificationsTable } from "@/components/admin/user-verifications/user-verifications-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function UserVerificationsPage() {
  // In a real app, we would fetch this data from the API
  // const userVerifications = await fetch('/api/user-verifications').then(res => res.json())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Verifications</h1>
          <p className="text-muted-foreground">Monitor user login status and admin rights</p>
        </div>
        <Link href="/admin/user-verifications/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Verification
          </Button>
        </Link>
      </div>

      <UserVerificationsTable />
    </div>
  )
}
