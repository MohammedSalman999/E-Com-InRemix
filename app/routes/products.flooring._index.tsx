"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { prisma } from "~/utils/db"
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { Flooring } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export const loader: LoaderFunction = async () => {
  const items = await prisma.flooring.findMany()
  return Response.json({ items })
}

function ItemDetails({ item }: { item: Flooring }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Category: {item.category}</p>
        <p className="text-gray-600">Brand: {item.brand}</p>
        <p className="text-gray-600">Price: ₹{item.price}</p>
        {item.size && <p className="text-gray-600">Size: {item.size}</p>}
        {item.type && <p className="text-gray-600">Type: {item.type}</p>}
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-sm text-gray-500">Added on: {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default function FlooringItems() {
  const { items } = useLoaderData<{ items: Flooring[] }>()
  const { setPanelContent } = useRightPanel()

  const [selectedItem, setSelectedItem] = useState<Flooring | null>(items[0] || null)

  useEffect(() => {
    setPanelContent(selectedItem ? <ItemDetails item={selectedItem} /> : <p>No flooring items available.</p>)
  }, [selectedItem, setPanelContent])

  // Group items by category for navigation
  const categories = [
    { name: "Bath Tiles", path: "bath-tiles", key: "BATH_TILES" },
    { name: "Quartz", path: "quartz", key: "QUARTZ" },
    { name: "Floor Tiles", path: "floor-tiles", key: "FLOOR_TILES" },
    { name: "Wooden Floor", path: "wooden-floor", key: "WOODEN_FLOOR" },
    { name: "Tile Adhesive", path: "tile-adhesive", key: "TILE_ADHESIVE" },
    { name: "Tile Grout", path: "tile-grout", key: "TILE_GROUT" },
    { name: "Ceramic Tiles", path: "ceramic-tiles", key: "CERAMIC_TILES" },
    { name: "Vitrified Tiles", path: "vitrified-tiles", key: "VITRIFIED_TILES" },
  ]

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">All Flooring Products</h1>

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
              <p className="text-gray-600">Category: {item.category}</p>
              <p className="text-gray-600">Brand: {item.brand}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

