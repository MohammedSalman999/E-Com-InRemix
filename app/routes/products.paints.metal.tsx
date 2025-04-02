import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../utils/db"; // Ensure correct path
import { useState, useEffect } from "react";
import { useRightPanel } from "~/contexts/right-panel-context";
import type { Paints } from "@prisma/client"; // Import Paints type
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

// Server-side data fetching (Only INTERIOR category paints)
export const loader: LoaderFunction = async () => {
  const paints = await prisma.paints.findMany({
    where: {
      category: "METAL",
    },
  });

  return Response.json({ paints });
};

// Component for paint details to be shown in the right panel
function PaintDetails({ paint }: { paint: Paints }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{paint.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Category: {paint.category}</p>
        <p className="text-gray-600">{paint.content}</p>
        <p className="text-sm text-gray-500">
          Added on: {new Date(paint.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default function MetalPaints() {
  const { paints } = useLoaderData<{ paints: Paints[] }>();
  const { setPanelContent } = useRightPanel();

  // Default: First paint ko show karo (agar available hai)
  const [selectedPaint, setSelectedPaint] = useState<Paints | null>(
    paints[0] || null
  );

  // Update right panel when selected paint changes
  useEffect(() => {
    setPanelContent(
      selectedPaint ? (
        <PaintDetails paint={selectedPaint} />
      ) : (
        <p>No paints available.</p>
      )
    );
  }, [selectedPaint, setPanelContent]);

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-bold mb-4">Metal Paints</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paints.map((paint) => (
          <button
            key={paint.id}
            className={`cursor-pointer hover:shadow-xl transition w-full text-left p-2 border rounded-lg ${
              selectedPaint?.id === paint.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedPaint(paint)}
          >
            <CardHeader>
              <CardTitle>{paint.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Category: {paint.category}</p>
              <p className="text-gray-500 truncate">{paint.content}</p>
            </CardContent>
          </button>
        ))}
      </div>
    </div>
  );
}
