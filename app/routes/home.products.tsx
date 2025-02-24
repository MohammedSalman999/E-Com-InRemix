import { FC } from "react";
import Card from "../../components/Card";
import { Link } from "@remix-run/react";

const Index: FC = () => {
  const cards = [
    {
      title: " Adhesives and Sealants",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: "Building Material",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: "Doors Window and Woods",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: " Electrical",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: " Flooring",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: "Home Appliances",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: " Kitchen and Home Hardware",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: " Paints",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: " Plumbing",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: "Tools",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: "Hobs",
      description: "This card contains details about React fundamentals.",
    },
    {
      title: "Chimney",
      description: "This card contains details about React fundamentals.",
    },
  ];

  return (
    // <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-8">
    <div className="min-h-screen w-full bg-[#C7C6C6] p-8">
      {/* <div className="min-h-screen w-full bg-white p-8"> */}
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-white/90 mb-12 text-center"> */}
        <h1 className="text-4xl font-bold text-[#05032B] mb-12 text-start">
          Products
        </h1>

        {/* 🔥 Grid wrapper with relative positioning */}
        <div className="relative z-0">
          {/* 🔥 Overlay that hides below cards when any card expands */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0
        transition-opacity duration-300 pointer-events-none group-hover:opacity-100 z-40"
          ></div>

          {/* 🔥 Grid of cards */}
          <div className="grid grid-cols-3 gap-6 relative z-20">
            {cards.map((card, index) => (
              <div key={index} className="relative group">
                <Link to={`/products/${card.title}`}>
                  <Card {...card} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Shop Now Button */}
      <div className="items-end mt-8 flex justify-center">
        <Link
          to="/products"
          className="relative inline-block transition-transform hover:scale-105"
        >
          <img
            className="w-48 h-12"
            src="/images/rectangle-11.svg"
            alt="Shop Now Background"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-2xl italic">
            Shop Now
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Index;
