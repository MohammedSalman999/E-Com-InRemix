"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db"
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { Electrical } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export const loader: LoaderFunction = async () => {
  const items = await prisma.electrical.findMany({
    where: {
      category: "FAN",
    },
  })
  return Response.json({ items })
}

function ItemDetails({ item }: { item: Electrical }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Category: {item.category}</p>
        <p className="text-gray-600">Brand: {item.brand}</p>
        <p className="text-gray-600">Price: ₹{item.price}</p>
        {item.power && <p className="text-gray-600">Power: {item.power}</p>}
        {item.blades && <p className="text-gray-600">Blades: {item.blades}</p>}
        {item.type && <p className="text-gray-600">Type: {item.type}</p>}
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function FanItems() {
  const { items } = useLoaderData<{ items: Electrical[] }>()
  const { setPanelContent } = useRightPanel()

  const [selectedItem, setSelectedItem] = useState<Electrical | null>(items[0] || null)

  useEffect(() => {
    setPanelContent(selectedItem ? <ItemDetails item={selectedItem} /> : <p>No fan items available.</p>)
  }, [selectedItem, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Fans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedItem?.id === item.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {item.brand}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              {item.blades && <p className="text-gray-600">Blades: {item.blades}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

