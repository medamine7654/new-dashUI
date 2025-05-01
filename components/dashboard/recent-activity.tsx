import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Computer, HardDrive, RefreshCw, UserCheck, UserMinus, WifiOff } from "lucide-react"
import { activities } from "@/lib/data"

interface RecentActivityProps {
  fullLog?: boolean
}

export function RecentActivity({ fullLog = false }: RecentActivityProps) {
  const displayActivities = fullLog ? activities : activities.slice(0, 4)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "user-check":
        return <UserCheck className="h-4 w-4" />
      case "computer":
        return <Computer className="h-4 w-4" />
      case "wifi-off":
        return <WifiOff className="h-4 w-4" />
      case "hard-drive":
        return <HardDrive className="h-4 w-4" />
      case "user-minus":
        return <UserMinus className="h-4 w-4" />
      case "refresh-cw":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <UserCheck className="h-4 w-4" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage alt={activity.type} />
            <AvatarFallback className="bg-primary/10">{getIcon(activity.icon)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {activity.type
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <div className="flex items-center gap-2 pt-1">
              <time className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</time>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{activity.department}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
