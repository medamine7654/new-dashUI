import { WorkerForm } from "@/components/admin/workers/worker-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EditWorkerPage({
  params,
}: {
  params: { id: string }
}) {
  // In a real app, we would fetch this data from the API
  // const worker = await fetch(`/api/workers/${params.id}`).then(res => res.json())

  // For demo purposes, we'll use mock data
  const workerId = params.id

  // If worker not found, show 404 page
  if (!workerId.startsWith("W-")) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/admin/workers/${workerId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Worker</h1>
          <p className="text-muted-foreground">Update worker information</p>
        </div>
      </div>

      <WorkerForm workerId={workerId} />
    </div>
  )
}
