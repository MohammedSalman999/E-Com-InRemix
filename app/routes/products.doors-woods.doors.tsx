"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "../utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { WoodMaterial } from "@prisma/client" // Import WoodMaterial type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only DOORS category woods)
export const loader: LoaderFunction = async () => {
  const woods = await prisma.woodMaterial.findMany({
    where: {
      category: "DOORS",
    },
  })

  return Response.json({ woods })
}

// Component for wood material details to be shown in the right panel
function WoodDetails({ wood }: { wood: WoodMaterial }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{wood.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Brand: {wood.brand}</p>
        <p className="text-gray-700">Price: ₹{wood.price}</p>
        {wood.size && <p className="text-gray-600">Size: {wood.size}</p>}
        {wood.thickness && <p className="text-gray-600">Thickness: {wood.thickness}</p>}
        {wood.finishes && <p className="text-gray-600">Finishes: {wood.finishes}</p>}
        {wood.lamination && <p className="text-gray-600">Lamination: {wood.lamination}</p>}
        <p className="text-gray-600">Quantity: {wood.quantity} available</p>
        <p className="text-sm text-gray-500">Added on: {new Date(wood.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function DoorsWoods() {
  const { woods } = useLoaderData<{ woods: WoodMaterial[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First wood material to show (if available)
  const [selectedWood, setSelectedWood] = useState<WoodMaterial | null>(woods[0] || null)

  // Update right panel when selected wood changes
  useEffect(() => {
    setPanelContent(selectedWood ? <WoodDetails wood={selectedWood} /> : <p>No door materials available.</p>)
  }, [selectedWood, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Doors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {woods.map((wood) => (
          <button
            key={wood.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedWood?.id === wood.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedWood(wood)}
          >
            <CardHeader>
              <CardTitle>{wood.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {wood.brand}</p>
              <p className="text-gray-600">Price: ₹{wood.price}</p>
              {wood.size && <p className="text-gray-500">Size: {wood.size}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

