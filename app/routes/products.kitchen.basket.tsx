"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only BASKET category items)
export const loader: LoaderFunction = async () => {
  const baskets = await prisma.kitchenHardware.findMany({
    where: {
      category: "BASKET",
    },
  })

  return Response.json({ baskets })
}

// Component for basket details to be shown in the right panel
function BasketDetails({ item }: { item: KitchenHardware }) {
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

export default function Baskets() {
  const { baskets } = useLoaderData<{ baskets: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First basket ko show karo (agar available hai)
  const [selectedBasket, setSelectedBasket] = useState<KitchenHardware | null>(baskets[0] || null)

  // Update right panel when selected basket changes
  useEffect(() => {
    setPanelContent(selectedBasket ? <BasketDetails item={selectedBasket} /> : <p>No baskets available.</p>)
  }, [selectedBasket, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Baskets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {baskets.map((basket) => (
          <button
            key={basket.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedBasket?.id === basket.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedBasket(basket)}
          >
            <CardHeader>
              <CardTitle>{basket.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {basket.brand}</p>
              <p className="text-gray-600">Price: ₹{basket.price.toFixed(2)}</p>
              {basket.material && <p className="text-gray-500">Material: {basket.material}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

