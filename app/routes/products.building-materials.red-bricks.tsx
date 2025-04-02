import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db";
import { useState, useEffect } from "react";
import { useRightPanel } from "~/contexts/right-panel-context";
import type { BuildingMaterial } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const loader: LoaderFunction = async () => {
  const items = await prisma.buildingMaterial.findMany({
    where: { category: "RED_BRICKS" },
  });
  return Response.json({ items });
};

export default function TmtBars() {
  const { items } = useLoaderData<{ items: BuildingMaterial[] }>();
  const { setPanelContent } = useRightPanel();

  const [selectedItem, setSelectedItem] = useState<BuildingMaterial | null>(
    items[0] || null
  );

  useEffect(() => {
    setPanelContent(
      selectedItem ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{selectedItem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Brand: {selectedItem.brand}</p>
            <p className="text-gray-600">Price: ₹{selectedItem.price}</p>
            <p className="text-gray-600">Quantity: {selectedItem.quantity}</p>
            <p className="text-sm text-gray-500">
              Added on: {new Date(selectedItem.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ) : (
        <p>No HPL Sheets available.</p>
      )
    );
  }, [selectedItem, setPanelContent]);

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Red Bricks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedItem?.id === item.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Brand: {item.brand}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  );
}
