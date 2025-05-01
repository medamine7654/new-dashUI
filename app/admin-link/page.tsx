import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function AdminLinkPage() {
  // In a real app, you would check if the user is authenticated and has admin privileges
  const isAdmin = true
  const djangoAdminUrl = "http://your-django-backend/admin/"

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xl font-bold">LEONI Admin Access</span>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Administration</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Django Admin Panel</CardTitle>
              <CardDescription>Access the full-featured Django admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                The Django admin panel provides complete CRUD operations, user management, and advanced filtering.
              </p>
              <Link href={djangoAdminUrl} target="_blank">
                <Button className="w-full">Open Django Admin</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, groups and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Control who has access to different parts of the system with fine-grained permissions.
              </p>
              <Link href={`${djangoAdminUrl}auth/user/`} target="_blank">
                <Button className="w-full">Manage Users</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage workers, computers and departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href={`${djangoAdminUrl}factory_app/worker/`} target="_blank">
                  <Button variant="outline" className="w-full">
                    Manage Workers
                  </Button>
                </Link>
                <Link href={`${djangoAdminUrl}factory_app/computer/`} target="_blank">
                  <Button variant="outline" className="w-full">
                    Manage Computers
                  </Button>
                </Link>
                <Link href={`${djangoAdminUrl}factory_app/department/`} target="_blank">
                  <Button variant="outline" className="w-full">
                    Manage Departments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>View key metrics and perform quick actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The custom admin dashboard provides a quick overview of your factory's status and allows you to perform
              common actions.
            </p>
            <Link href={`${djangoAdminUrl}dashboard/`} target="_blank">
              <Button>Open Admin Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
