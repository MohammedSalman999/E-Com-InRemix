import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db"; // Ensure correct path
import { useState, useEffect } from "react";
import { useRightPanel } from "~/contexts/right-panel-context";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Paints } from "@prisma/client"; // Type-safety from Prisma

// Server-side data fetching
export const loader: LoaderFunction = async () => {
  const paints = await prisma.paints.findMany(); // Fetch all paints
  return Response.json({ paints });
};

// Component for showing details in the right panel
function PaintDetails({ paint }: { paint: Paints }) {
  return (
    <Card className="border p-4 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>{paint.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Category: {paint.category}</p>
        <p className="text-gray-700">{paint.content}</p>
        <p className="text-sm text-gray-500">
          Added on: {new Date(paint.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

function Paints() {
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
      <h1 className="text-xl font-bold mb-4">All Paints</h1>
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

export default Paints;
