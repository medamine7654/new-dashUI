import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Computer, Factory, ShieldCheck, Users, Globe, CheckSquare } from "lucide-react"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { WorkerStats } from "@/components/dashboard/worker-stats"
import { ComputerStats } from "@/components/dashboard/computer-stats"
import { VpnStatusOverview } from "@/components/dashboard/vpn-status-overview"
import { VerificationTasksOverview } from "@/components/dashboard/verification-tasks-overview"
import Link from "next/link"

export default async function Dashboard() {
  // In a real app, we would fetch this data from the API
  // const dashboardData = await fetch('/api/dashboard').then(res => res.json())

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="border-b shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LEONI Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
             
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Factory Overview</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="computers">Computers</TabsTrigger>
            <TabsTrigger value="vpn">VPN Status</TabsTrigger>
            <TabsTrigger value="verification">Verification Tasks</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Computers</CardTitle>
                  <Computer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">165</div>
                  <p className="text-xs text-muted-foreground">91% operational rate</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active VPN Connections</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 admin, 1 standard</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">2 critical, 5 standard</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-white shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle>Productivity Overview</CardTitle>
                  <CardDescription>Factory productivity metrics for the past 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-white shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest events from the factory floor</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="workers" className="space-y-4">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Worker Statistics</CardTitle>
                <CardDescription>Detailed breakdown of worker data and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkerStats />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="computers" className="space-y-4">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Computer Systems</CardTitle>
                <CardDescription>Status and performance of all computer systems</CardDescription>
              </CardHeader>
              <CardContent>
                <ComputerStats />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vpn" className="space-y-4">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>VPN Status</CardTitle>
                <CardDescription>Current VPN connections and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <VpnStatusOverview />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="verification" className="space-y-4">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Verification Tasks</CardTitle>
                <CardDescription>Scheduled and ongoing verification operations</CardDescription>
              </CardHeader>
              <CardContent>
                <VerificationTasksOverview />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Comprehensive activity log from all factory systems</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity fullLog={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
