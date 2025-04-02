"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only HINGES category items)
export const loader: LoaderFunction = async () => {
  const hinges = await prisma.kitchenHardware.findMany({
    where: {
      category: "HINGES",
    },
  })

  return Response.json({ hinges })
}

// Component for hinge details to be shown in the right panel
function HingeDetails({ item }: { item: KitchenHardware }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Brand: {item.brand}</p>
        <p className="text-gray-700">Price: ₹{item.price.toFixed(2)}</p>
        <p className="text-gray-700">Quantity: {item.quantity}</p>

        {item.material && <p className="text-gray-600">Material: {item.material}</p>}
        {item.size && <p className="text-gray-600">Size: {item.size}</p>}
        {item.loadCapacity && <p className="text-gray-600">Load Capacity: {item.loadCapacity}</p>}

        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function Hinges() {
  const { hinges } = useLoaderData<{ hinges: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First hinge ko show karo (agar available hai)
  const [selectedHinge, setSelectedHinge] = useState<KitchenHardware | null>(hinges[0] || null)

  // Update right panel when selected hinge changes
  useEffect(() => {
    setPanelContent(selectedHinge ? <HingeDetails item={selectedHinge} /> : <p>No hinges available.</p>)
  }, [selectedHinge, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Hinges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hinges.map((hinge) => (
          <button
            key={hinge.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedHinge?.id === hinge.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedHinge(hinge)}
          >
            <CardHeader>
              <CardTitle>{hinge.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {hinge.brand}</p>
              <p className="text-gray-600">Price: ₹{hinge.price.toFixed(2)}</p>
              {hinge.material && <p className="text-gray-500">Material: {hinge.material}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

