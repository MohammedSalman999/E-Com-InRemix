"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only PANTRY_UNIT category items)
export const loader: LoaderFunction = async () => {
  const pantryUnits = await prisma.kitchenHardware.findMany({
    where: {
      category: "PANTRY_UNIT",
    },
  })

  return Response.json({ pantryUnits })
}

// Component for pantry unit details to be shown in the right panel
function PantryUnitDetails({ item }: { item: KitchenHardware }) {
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

export default function PantryUnits() {
  const { pantryUnits } = useLoaderData<{ pantryUnits: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First pantry unit ko show karo (agar available hai)
  const [selectedPantryUnit, setSelectedPantryUnit] = useState<KitchenHardware | null>(pantryUnits[0] || null)

  // Update right panel when selected pantry unit changes
  useEffect(() => {
    setPanelContent(
      selectedPantryUnit ? <PantryUnitDetails item={selectedPantryUnit} /> : <p>No pantry units available.</p>,
    )
  }, [selectedPantryUnit, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Pantry Units</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pantryUnits.map((pantryUnit) => (
          <button
            key={pantryUnit.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedPantryUnit?.id === pantryUnit.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedPantryUnit(pantryUnit)}
          >
            <CardHeader>
              <CardTitle>{pantryUnit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {pantryUnit.brand}</p>
              <p className="text-gray-600">Price: ₹{pantryUnit.price.toFixed(2)}</p>
              {pantryUnit.material && <p className="text-gray-500">Material: {pantryUnit.material}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

