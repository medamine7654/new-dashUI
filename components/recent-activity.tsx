import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Computer, HardDrive, UserCheck, UserMinus, WifiOff } from "lucide-react"

interface RecentActivityProps {
  fullLog?: boolean
}

export function RecentActivity({ fullLog = false }: RecentActivityProps) {
  const activities = [
    {
      icon: <UserCheck className="h-4 w-4" />,
      name: "Worker Check-in",
      description: "Ahmed Malik checked in for morning shift",
      timestamp: "09:15 AM",
      department: "Assembly Line A",
    },
    {
      icon: <Computer className="h-4 w-4" />,
      name: "Computer Maintenance",
      description: "Scheduled maintenance completed on 5 workstations",
      timestamp: "08:45 AM",
      department: "IT Department",
    },
    {
      icon: <WifiOff className="h-4 w-4" />,
      name: "Network Issue",
      description: "Brief network outage in Building C resolved",
      timestamp: "08:30 AM",
      department: "IT Department",
    },
    {
      icon: <HardDrive className="h-4 w-4" />,
      name: "Server Update",
      description: "Database server updated to latest version",
      timestamp: "08:15 AM",
      department: "IT Department",
    },
    {
      icon: <UserMinus className="h-4 w-4" />,
      name: "Worker Check-out",
      description: "Sofia Chen completed night shift",
      timestamp: "07:00 AM",
      department: "Quality Control",
    },
  ]

  const extendedActivities = [
    ...activities,
    {
      icon: <Computer className="h-4 w-4" />,
      name: "System Restart",
      description: "Production monitoring systems restarted",
      timestamp: "06:30 AM",
      department: "Operations",
    },
    {
      icon: <UserCheck className="h-4 w-4" />,
      name: "Worker Check-in",
      description: "Jamal Wilson checked in for night shift",
      timestamp: "06:00 AM",
      department: "Logistics",
    },
  ]

  const displayActivities = fullLog ? extendedActivities : activities.slice(0, 4)

  return (
    <div className="space-y-4">
      {displayActivities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage alt={activity.name} />
            <AvatarFallback className="bg-primary/10">{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <div className="flex items-center gap-2 pt-1">
              <time className="text-xs text-muted-foreground">{activity.timestamp}</time>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{activity.department}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
