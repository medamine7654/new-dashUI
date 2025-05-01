import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { users } from "@/lib/data"

export function RecentUsers() {
  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHrs < 1) {
      return "Just now"
    } else if (diffHrs < 24) {
      return `${diffHrs} hours ago`
    } else {
      return "Yesterday"
    }
  }

  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl || `/placeholder.svg?height=40&width=40&text=${user.name.charAt(0)}`} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">{formatLastActive(user.lastActive)}</span>
              <span className="mx-2 text-xs text-muted-foreground">•</span>
              <span className="text-xs font-medium">{user.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
