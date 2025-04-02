"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only ROLLING_SHUTTER category items)
export const loader: LoaderFunction = async () => {
  const rollingShutters = await prisma.kitchenHardware.findMany({
    where: {
      category: "ROLLING_SHUTTER",
    },
  })

  return Response.json({ rollingShutters })
}

// Component for rolling shutter details to be shown in the right panel
function RollingShutterDetails({ item }: { item: KitchenHardware }) {
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

        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function RollingShutters() {
  const { rollingShutters } = useLoaderData<{ rollingShutters: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First rolling shutter ko show karo (agar available hai)
  const [selectedRollingShutter, setSelectedRollingShutter] = useState<KitchenHardware | null>(
    rollingShutters[0] || null,
  )

  // Update right panel when selected rolling shutter changes
  useEffect(() => {
    setPanelContent(
      selectedRollingShutter ? (
        <RollingShutterDetails item={selectedRollingShutter} />
      ) : (
        <p>No rolling shutters available.</p>
      ),
    )
  }, [selectedRollingShutter, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Rolling Shutters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rollingShutters.map((rollingShutter) => (
          <button
            key={rollingShutter.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedRollingShutter?.id === rollingShutter.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedRollingShutter(rollingShutter)}
          >
            <CardHeader>
              <CardTitle>{rollingShutter.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {rollingShutter.brand}</p>
              <p className="text-gray-600">Price: ₹{rollingShutter.price.toFixed(2)}</p>
              {rollingShutter.material && <p className="text-gray-500">Material: {rollingShutter.material}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

