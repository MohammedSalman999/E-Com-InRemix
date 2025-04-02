"use client"

import { Link, Outlet } from "@remix-run/react"
import { AppSidebar } from "~/components/app-sidebar"
import { SidebarProvider } from "~/components/ui/sidebar"
import { useState } from "react"
import { ChevronDown, ChevronRight, ShoppingCart } from "lucide-react"
import { RightPanelProvider, useRightPanel } from "~/contexts/right-panel-context"
import { useAuth } from "@clerk/remix"
import { useCartStore } from "~/stores/cart.store"
import { useNavigate } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

// Enhanced Right Panel Component
function RightPanel() {
  const { panelContent } = useRightPanel()
  const { addItem } = useCartStore()
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!isSignedIn) {
      alert("Cart me add karne ke liye pehle sign in karein")
      navigate("/sign-in")
      return
    }

    if (!panelContent?.product) {
      alert("Product not available")
      return
    }

    addItem({
      id: panelContent.product.id,
      name: panelContent.product.name,
      price: panelContent.product.price,
      quantity: 1,
      imageUrl: panelContent.product.imageUrl,
    })
    alert("Product cart me add ho gaya! 🛒")
  }

  return (
    <div className="w-96 border-l border-gray-200 overflow-y-auto">
      {panelContent?.product ? (
        <div className="p-6 space-y-6">
          {/* Product Image */}
          {panelContent.product.imageUrl && (
            <img
              src={panelContent.product.imageUrl || "/placeholder.svg"}
              alt={panelContent.product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          )}

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{panelContent.product.name}</h1>
            <p className="text-xl font-semibold">₹{panelContent.product.price}</p>

            <div className="space-y-2">
              {panelContent.product.brand && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Brand:</span>
                  <span className="font-medium">{panelContent.product.brand}</span>
                </div>
              )}

              {panelContent.product.size && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Size:</span>
                  <span className="font-medium">{panelContent.product.size}</span>
                </div>
              )}

              {panelContent.product.category && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{panelContent.product.category}</span>
                </div>
              )}

              {panelContent.product.quantity && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Availability:</span>
                  <span
                    className={`font-medium ${panelContent.product.quantity > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {panelContent.product.quantity > 0 ? `In Stock (${panelContent.product.quantity})` : "Out of Stock"}
                  </span>
                </div>
              )}
            </div>

            <Separator />

            <div className="pt-4">
              <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-6">
          <p className="text-gray-500 italic">Koi product select nahi kiya gaya hai</p>
        </div>
      )}
    </div>
  )
}

// Categories & Subcategories
const categories = [
  {
    name: "Adhesives",
    key: "adhesives",
    subcategories: ["Adhesives", "Bond", "Epoxy", "Waterproofing"],
  },
  {
    name: "Building Materials",
    key: "building-materials",
    subcategories: [
      "Cement",
      "Putty",
      "Grey Cement",
      "POP",
      "White Cement",
      "HPL Sheets",
      "TMT Bars",
      "Red Bricks",
      "Bricks Fly Ash",
    ],
  },
  {
    name: "Doors & Woods",
    key: "doors-woods",
    subcategories: ["Edge Tape", "Laminates", "Doors", "HDHMR", "MDF", "Plywood", "Veneer"],
  },
  {
    name: "Electrical",
    key: "electrical",
    subcategories: ["Motors", "Switches", "Cables", "Fan", "Geyser", "Lights", "MCB", "Pump"],
  },
  {
    name: "Flooring",
    key: "flooring",
    subcategories: [
      "Bath Tiles",
      "Quartz",
      "Floor Tiles",
      "Wooden Floor",
      "Tile Adhesive",
      "Tile Grout",
      "Ceramic Tiles",
      "Vitrified Tiles",
    ],
  },
  {
    name: "Home Appliances",
    key: "home",
    subcategories: ["Air Conditioner"],
  },
  {
    name: "Kitechen & Home Hardware",
    key: "kitchen",
    subcategories: [
      "Chimney",
      "Drawer System",
      "Hinges",
      "Hobs",
      "Pantry Unit",
      "Rolling Shutter",
      "Sink",
      "Slides",
      "Uplift",
      "Basket",
    ],
  },
  {
    name: "Paints",
    key: "paints",
    subcategories: ["Exterior", "Interior", "Metal", "Wood"],
  },
]

export default function ProductsLayout() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <RightPanelProvider>
      <SidebarProvider className="bg-[#C7C6C6]">
        <AppSidebar>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              <Link to="/home" className="w-full text-left rounded">
                The Build Mall
              </Link>
            </h2>
            <ul>
              {categories.map(({ name, key, subcategories }) => (
                <li key={key} className="mb-2">
                  <button
                    onClick={() => toggleCategory(key)}
                    className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 flex items-center justify-between"
                  >
                    <span>{name}</span>
                    {expandedCategory === key ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {expandedCategory === key && (
                    <ul className="ml-4 mt-1">
                      {subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/products/${key}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                            className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 text-sm block"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </AppSidebar>

        {/* Layout - Main Section & Right Panel */}
        <div className="flex-1 flex">
          {/* Main Section */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
          </div>

          {/* Right Panel */}
          <RightPanel />
        </div>
      </SidebarProvider>
    </RightPanelProvider>
  )
}
