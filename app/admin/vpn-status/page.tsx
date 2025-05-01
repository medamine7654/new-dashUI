import { VpnStatusTable } from "@/components/admin/vpn-status/vpn-status-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function VpnStatusPage() {
  // In a real app, we would fetch this data from the API
  // const vpnStatuses = await fetch('/api/vpn-statuses').then(res => res.json())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPN Status</h1>
          <p className="text-muted-foreground">Monitor VPN connections and activity</p>
        </div>
        <Link href="/admin/vpn-status/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add VPN Connection
          </Button>
        </Link>
      </div>

      <VpnStatusTable />
    </div>
  )
}
