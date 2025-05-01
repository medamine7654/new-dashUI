"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Computer,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Factory,
  Shield,
  Globe,
  CheckSquare,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Workers",
    href: "/admin/workers",
    icon: Users,
  },
  {
    title: "Computers",
    href: "/admin/computers",
    icon: Computer,
  },
  {
    title: "User Verifications",
    href: "/admin/user-verifications",
    icon: Shield,
  },
  {
    title: "VPN Status",
    href: "/admin/vpn-status",
    icon: Globe,
  },
  {
    title: "Verification Tasks",
    href: "/admin/verification-tasks",
    icon: CheckSquare,
  },
  {
    title: "Departments",
    href: "/admin/departments",
    icon: Building2,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white shadow-sm">
      <div className="flex h-14 items-center border-b px-4 bg-white">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Factory className="h-6 w-6 text-primary" />
          <span>LEONI Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
