"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db" // Ensure correct path
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { KitchenHardware } from "@prisma/client" // Import KitchenHardware type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

// Server-side data fetching (Only SLIDES category items)
export const loader: LoaderFunction = async () => {
  const slides = await prisma.kitchenHardware.findMany({
    where: {
      category: "SLIDES",
    },
  })

  return Response.json({ slides })
}

// Component for slide details to be shown in the right panel
function SlideDetails({ item }: { item: KitchenHardware }) {
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

export default function Slides() {
  const { slides } = useLoaderData<{ slides: KitchenHardware[] }>()
  const { setPanelContent } = useRightPanel()

  // Default: First slide ko show karo (agar available hai)
  const [selectedSlide, setSelectedSlide] = useState<KitchenHardware | null>(slides[0] || null)

  // Update right panel when selected slide changes
  useEffect(() => {
    setPanelContent(selectedSlide ? <SlideDetails item={selectedSlide} /> : <p>No slides available.</p>)
  }, [selectedSlide, setPanelContent])

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Slides</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {slides.map((slide) => (
          <button
            key={slide.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedSlide?.id === slide.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedSlide(slide)}
          >
            <CardHeader>
              <CardTitle>{slide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {slide.brand}</p>
              <p className="text-gray-600">Price: ₹{slide.price.toFixed(2)}</p>
              {slide.loadCapacity && <p className="text-gray-500">Load Capacity: {slide.loadCapacity}</p>}
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  )
}

