"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { workers } from "@/lib/data"

interface WorkerFormProps {
  workerId?: string
}

export function WorkerForm({ workerId }: WorkerFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    shift: "",
    status: "Active",
    position: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    notes: "",
  })

  useEffect(() => {
    if (workerId) {
      // In a real app, this would be an API call
      // fetch(`/api/workers/${workerId}`).then(res => res.json()).then(data => {
      //   setFormData(data)
      // })

      // For demo purposes, we'll use mock data
      const worker = workers.find((w) => w.id === workerId)
      if (worker) {
        setFormData({
          name: worker.name,
          department: worker.department,
          shift: worker.shift,
          status: worker.status,
          position: worker.position || "",
          email: worker.email || "",
          phone: worker.phone || "",
          address: worker.address || "",
          emergencyContact: worker.emergencyContact || "",
          notes: worker.notes || "",
        })
      }
    }
  }, [workerId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (workerId) {
        // Update existing worker
        // await fetch(`/api/workers/${workerId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
        console.log("Updating worker:", formData)
      } else {
        // Create new worker
        // await fetch('/api/workers', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
        console.log("Creating worker:", formData)
      }

      // Redirect back to workers list
      router.push("/admin/workers")
    } catch (error) {
      console.error("Error saving worker:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Worker Information</CardTitle>
            <CardDescription>Enter the worker's personal and employment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department
                </label>
                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Assembly">Assembly</SelectItem>
                    <SelectItem value="Quality Control">Quality Control</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Position
                </label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter position"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="shift" className="text-sm font-medium">
                  Shift
                </label>
                <Select value={formData.shift} onValueChange={(value) => handleSelectChange("shift", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Enter the worker's contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="emergencyContact" className="text-sm font-medium">
                Emergency Contact
              </label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Name, Phone Number"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white mt-6">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Any other relevant details about the worker</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/workers">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {workerId ? "Update Worker" : "Save Worker"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
