import { useParams } from "@remix-run/react";
import { useState } from "react";

export default function Title() {
  const { title } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const cards = [
    { title: "Adhesives and Sealants", description: "Capture moments." },
    {
      title: "Building Material",
      description: "Experience the best materials.",
    },
    {
      title: "Doors Window and Woods",
      description: "Quality wood and designs.",
    },
    { title: "Electrical", description: "Latest electrical appliances." },
    { title: "Flooring", description: "Best flooring solutions." },
    { title: "Home Appliances", description: "Affordable home appliances." },
    { title: "Kitchen and Home Hardware", description: "Kitchen essentials." },
    {
      title: "Paints",
      description: "Premium quality paints.",
      subCategories: [
        {
          type: "Interior Paints",
          description: "Beautiful and durable interior paints for your home.",
          details: [
            "Matte Finish - Elegant and smooth texture.",
            "Glossy Finish - Adds a shiny and reflective touch.",
            "Washable Paint - Easy to clean and maintain.",
          ],
        },
        {
          type: "Exterior Paints",
          description: "Weather-resistant paints for long-lasting exteriors.",
          details: [
            "Weatherproof Paint - Protects against rain and sun.",
            "Anti-Fungal Paint - Prevents mold and mildew.",
            "Dust-Resistant Paint - Keeps walls clean for longer.",
          ],
        },
      ],
    },
    { title: "Plumbing", description: "Reliable plumbing solutions." },
    { title: "Tools", description: "Top-notch tools for professionals." },
    { title: "Hobs", description: "Modern kitchen hobs." },
    { title: "Chimney", description: "Best chimneys for your home." },
  ];

  // Find the selected category
  const selectedCard = cards.find((card) => card.title === title);

  return (
    <div className="text-white text-4xl text-center w-full h-screen bg-[#C7C6C6] grid grid-cols-[20%_60%_20%] gap-5 p-5">
      {/* Left Column */}
      <div className="border-r border-gray-400 p-4">
        <h1 className="text-[#05032B] text-center font-bold text-4xl mb-4">
          {title}
        </h1>
        {selectedCard?.subCategories?.map((sub, index) => (
          <h2
            key={index}
            className={`cursor-pointer text-[#05032B] font-bold text-2xl p-2 ${
              selectedSubCategory === sub.type ? "bg-gray-300" : ""
            }`}
            onClick={() => setSelectedSubCategory(sub.type)}
          >
            {sub.type}
          </h2>
        ))}
      </div>

      {/* Center Column */}
      <div className="  text-black">
        {selectedCard?.subCategories ? (
          <div>
            {selectedCard.subCategories.map((sub, index) => (
              <div key={index} className="mb-5">
                <h2 className="text-[#05032B] font-bold text-2xl my-4">
                  {sub.type}
                </h2>
                <p className="text-gray-700">{sub.description}</p>
                <ul className="text-gray-600 list-disc list-inside">
                  {sub.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">{selectedCard?.description}</p>
        )}
      </div>

      {/* Right Column */}
      <div className="border-l border-gray-400 p-4">
        {selectedCard?.subCategories &&
          selectedCard.subCategories.map(
            (sub, index) =>
              sub.type === selectedSubCategory && (
                <div key={index}>
                  <h2 className="text-[#05032B] font-bold text-2xl mb-4">
                    {sub.type} Details
                  </h2>
                  <ul className="text-gray-600 list-disc list-inside">
                    {sub.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )
          )}
      </div>
    </div>
  );
}
