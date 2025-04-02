"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only SINK category items)
export const loader: LoaderFunction = async () => {
  const sinks = await prisma.kitchenHardware.findMany({
    where: {
      category: "SINK",
    },
  })

  return Response.json({ sinks })
}

// Component for sink details to be shown in the right panel
function SinkDetails({ item }: { item: KitchenHardware }) {
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
        {item.shape && <p className="text-gray-600">Shape: {item.shape}</p>}

        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function Sinks() {
  const { sinks } = useLoaderData<{ sinks: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First sink ko show karo (agar available hai)
  const [selectedSink, setSelectedSink] = useState<KitchenHardware | null>(sinks[0] || null)

  // Update right panel when selected sink changes
  useEffect(() => {
    setPanelContent(selectedSink ? <SinkDetails item={selectedSink} /> : <p>No sinks available.</p>)
  }, [selectedSink, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Sinks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sinks.map((sink) => (
          <button
            key={sink.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedSink?.id === sink.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedSink(sink)}
          >
            <CardHeader>
              <CardTitle>{sink.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {sink.brand}</p>
              <p className="text-gray-600">Price: ₹{sink.price.toFixed(2)}</p>
              {sink.material && <p className="text-gray-500">Material: {sink.material}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

