"use client"

import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/utils/db"
import { useState, useEffect } from "react"
import { useRightPanel } from "~/contexts/right-panel-context"
import type { Paints } from "@prisma/client"
import { Card, CardContent, CardHeader, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Heart } from 'lucide-react'

// Server-side data fetching (Only INTERIOR category paints)
export const loader: LoaderFunction = async () => {
  const paints = await prisma.paints.findMany({
    where: {
      category: "INTERIOR",
    },
  })
  return Response.json({ paints })
}

export default function InteriorPaints() {
  const { paints } = useLoaderData<{ paints: Paints[] }>()
  const { setPanelContent } = useRightPanel()
  const [selectedPaint, setSelectedPaint] = useState<Paints | null>(paints[0] || null)
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())

  // Update right panel when selected paint changes
  useEffect(() => {
    if (setPanelContent && selectedPaint) {
      setPanelContent({
        product: {
          id: selectedPaint.id,
          name: selectedPaint.title,
          price: selectedPaint.price,
          imageUrl: selectedPaint.imageUrl,
          brand: selectedPaint.brand,
          size: selectedPaint.size,
          quantity: selectedPaint.quantity,
          category: "Interior Paint",
        },
      })
    }
  }, [selectedPaint, setPanelContent])

  const handleWishlist = (paintId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setWishlistedItems((prev) => {
      const newWishlist = new Set(prev)
      newWishlist.has(paintId) ? newWishlist.delete(paintId) : newWishlist.add(paintId)
      return newWishlist
    })
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Interior Paints</h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-2">
        {paints.map((paint) => (
          <Card
            key={paint.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedPaint?.id === paint.id
                ? "border-primary"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedPaint(paint)}
          >
            {paint.imageUrl && (
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={paint.imageUrl || "/placeholder.svg"}
                  alt={paint.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            <CardHeader className="p-4 pb-2">
              <h3 className="text-lg font-semibold line-clamp-1">{paint.title}</h3>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-bold text-primary">₹{paint.price}</p>
                {paint.brand && <p className="text-sm text-muted-foreground">Brand: {paint.brand}</p>}
                {paint.size && <p className="text-sm text-muted-foreground">Size: {paint.size}</p>}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Button
                variant="default"
                size="sm"
                className="w-full mr-2"
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleWishlist(paint.id, e)}
                className={wishlistedItems.has(paint.id) ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${wishlistedItems.has(paint.id) ? "fill-current" : ""}`} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
