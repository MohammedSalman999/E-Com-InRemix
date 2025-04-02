"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

// Type for product data based on your existing files
interface Product {
  id: string
  title: string
  price: number
  imageUrl?: string
  brand?: string
  size?: string
  quantity?: number
  category?: string
  content?: string
  createdAt?: string | Date
}

interface ProductGridProps {
  products: Product[]
  onSelectProduct?: (product: Product) => void
  title?: string
}

export default function ProductGrid({ products, onSelectProduct, title = "Products" }: ProductGridProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())

  const handleProductSelect = (product: Product) => {
    setSelectedProductId(product.id)
    if (onSelectProduct) {
      onSelectProduct(product)
    }
  }

  const handleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setWishlistedItems((prev) => {
      const newWishlist = new Set(prev)
      newWishlist.has(productId) ? newWishlist.delete(productId) : newWishlist.add(productId)
      return newWishlist
    })
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedProductId === product.id ? "border-primary" : "border-border hover:border-primary/50"
            }`}
            onClick={() => handleProductSelect(product)}
          >
            {product.imageUrl && (
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-semibold line-clamp-1">{product.title}</CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-bold text-primary">₹{product.price}</p>
                {product.brand && <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>}
                {product.size && <p className="text-sm text-muted-foreground">Size: {product.size}</p>}
                {product.category && <p className="text-sm text-muted-foreground">Category: {product.category}</p>}
                {product.content && <p className="text-sm text-muted-foreground line-clamp-2">{product.content}</p>}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Button variant="default" size="sm" className="w-full mr-2">
                View Details
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleWishlist(product.id, e)}
                className={wishlistedItems.has(product.id) ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${wishlistedItems.has(product.id) ? "fill-current" : ""}`} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

