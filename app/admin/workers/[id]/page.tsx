import { WorkerDetails } from "@/components/admin/workers/worker-details"
import { notFound } from "next/navigation"

export default async function WorkerDetailsPage({
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

  return <WorkerDetails workerId={workerId} />
}
