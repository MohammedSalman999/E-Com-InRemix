"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { prisma } from "~/utils/db"
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { HomeAppliance } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export const loader: LoaderFunction = async () => {
  const items = await prisma.homeAppliance.findMany()
  return Response.json({ items })
}

function ItemDetails({ item }: { item: HomeAppliance }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Category: {item.category}</p>
        <p className="text-gray-600">Brand: {item.brand}</p>
        <p className="text-gray-600">Price: ₹{item.price}</p>
        {item.capacity && <p className="text-gray-600">Capacity: {item.capacity}</p>}
        {item.energyRating && <p className="text-gray-600">Energy Rating: {item.energyRating} Star</p>}
        {item.type && <p className="text-gray-600">Type: {item.type}</p>}
        {item.coolingTech && <p className="text-gray-600">Cooling Technology: {item.coolingTech}</p>}
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function ApplianceItems() {
  const { items } = useLoaderData<{ items: HomeAppliance[] }>()
  const { setPanelContent } = useRightPanel()

  const [selectedItem, setSelectedItem] = useState<HomeAppliance | null>(items[0] || null)

  useEffect(() => {
    setPanelContent(selectedItem ? <ItemDetails item={selectedItem} /> : <p>No home appliance items available.</p>)
  }, [selectedItem, setPanelContent])

  // Group items by category for navigation
  const categories = [{ name: "Air Conditioners", path: "air-conditioner", key: "AIR_CONDITIONER" }]

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">All Home Appliances</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <Link
            key={category.key}
            to={category.path}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-center"
          >
            {category.name}
          </Link>
        ))}
      </div>

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
              {item.capacity && <p className="text-gray-600">Capacity: {item.capacity}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

