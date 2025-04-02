"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only UPLIFT category items)
export const loader: LoaderFunction = async () => {
  const uplifts = await prisma.kitchenHardware.findMany({
    where: {
      category: "UPLIFT",
    },
  })

  return Response.json({ uplifts })
}

// Component for uplift details to be shown in the right panel
function UpliftDetails({ item }: { item: KitchenHardware }) {
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

export default function Uplifts() {
  const { uplifts } = useLoaderData<{ uplifts: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First uplift ko show karo (agar available hai)
  const [selectedUplift, setSelectedUplift] = useState<KitchenHardware | null>(uplifts[0] || null)

  // Update right panel when selected uplift changes
  useEffect(() => {
    setPanelContent(selectedUplift ? <UpliftDetails item={selectedUplift} /> : <p>No uplifts available.</p>)
  }, [selectedUplift, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Uplifts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {uplifts.map((uplift) => (
          <button
            key={uplift.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedUplift?.id === uplift.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedUplift(uplift)}
          >
            <CardHeader>
              <CardTitle>{uplift.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {uplift.brand}</p>
              <p className="text-gray-600">Price: ₹{uplift.price.toFixed(2)}</p>
              {uplift.loadCapacity && <p className="text-gray-500">Load Capacity: {uplift.loadCapacity}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

