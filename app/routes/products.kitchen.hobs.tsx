"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only HOBS category items)
export const loader: LoaderFunction = async () => {
  const hobs = await prisma.kitchenHardware.findMany({
    where: {
      category: "HOBS",
    },
  })

  return Response.json({ hobs })
}

// Component for hob details to be shown in the right panel
function HobDetails({ item }: { item: KitchenHardware }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Brand: {item.brand}</p>
        <p className="text-gray-700">Price: ₹{item.price.toFixed(2)}</p>
        <p className="text-gray-700">Quantity: {item.quantity}</p>

        {item.burner && <p className="text-gray-600">Burner: {item.burner}</p>}
        {item.material && <p className="text-gray-600">Material: {item.material}</p>}
        {item.hobType && <p className="text-gray-600">Hob Type: {item.hobType}</p>}
        {item.control && <p className="text-gray-600">Control: {item.control}</p>}

        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function Hobs() {
  const { hobs } = useLoaderData<{ hobs: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First hob ko show karo (agar available hai)
  const [selectedHob, setSelectedHob] = useState<KitchenHardware | null>(hobs[0] || null)

  // Update right panel when selected hob changes
  useEffect(() => {
    setPanelContent(selectedHob ? <HobDetails item={selectedHob} /> : <p>No hobs available.</p>)
  }, [selectedHob, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Hobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hobs.map((hob) => (
          <button
            key={hob.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedHob?.id === hob.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedHob(hob)}
          >
            <CardHeader>
              <CardTitle>{hob.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {hob.brand}</p>
              <p className="text-gray-600">Price: ₹{hob.price.toFixed(2)}</p>
              {hob.burner && <p className="text-gray-500">Burner: {hob.burner}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

