// import { FC } from "react";
// import Card from "../../components/Card";
// import { Link } from "@remix-run/react";

// const Index: FC = () => {
//   const cards = [
//     {
//       title: " Adhesives and Sealants",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Building Material",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Doors Window and Woods",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Electrical",
//       description:
//         "This category contains different types of electrical items.",
//       categories: [
//         {
//           name: "Wires",
//           items: [
//             { id: 1, name: "Copper Wire", price: 500 },
//             { id: 2, name: "Aluminum Wire", price: 300 },
//           ],
//         },
//         {
//           name: "Switches",
//           items: [
//             { id: 3, name: "Modular Switch", price: 200 },
//             { id: 4, name: "Classic Switch", price: 150 },
//           ],
//         },
//         {
//           name: "Lights",
//           items: [
//             { id: 5, name: "LED Bulb", price: 250 },
//             { id: 6, name: "Tube Light", price: 400 },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Paints",
//       description: "This category contains different types of paints.",
//       categories: [
//         {
//           name: "Interior",
//           items: [
//             { id: 1, name: "Luxury Interior Paint", price: 1200 },
//             { id: 2, name: "Matte Finish Paint", price: 900 },
//           ],
//         },
//         {
//           name: "Exterior",
//           items: [
//             { id: 3, name: "Weatherproof Paint", price: 1500 },
//             { id: 4, name: "Glossy Exterior Paint", price: 1300 },
//           ],
//         },
//       ],
//     },
//     {
//       title: " Flooring",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Home Appliances",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: " Kitchen and Home Hardware",
//       description: "This card contains details about React fundamentals.",
//     },

//     {
//       title: " Plumbing",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Tools",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Hobs",
//       description: "This card contains details about React fundamentals.",
//     },
//     {
//       title: "Chimney",
//       description: "This card contains details about React fundamentals.",
//     },
//   ];

//   return (
//     <div className="min-h-screen w-full bg-[#C7C6C6] p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-[#05032B] mb-12 text-start">
//           Products
//         </h1>

//         <div className="relative z-0">
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0
//         transition-opacity duration-300 pointer-events-none group-hover:opacity-100 z-40"
//           ></div>

//           <div className="grid grid-cols-3 gap-6 relative z-20 text-white">
//             {cards.map((card, index) => (
//               <div key={index} className="relative group">
//                 <Link to={`/products/${card.title}`}>
//                   <Card {...card} />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Shop Now Button */}
//       <div className="items-end mt-8 flex justify-center">
//         <Link
//           to="/products"
//           className="relative inline-block transition-transform hover:scale-105"
//         >
//           <img
//             className="w-48 h-12"
//             src="/images/rectangle-11.svg"
//             alt="Shop Now Background"
//           />
//           <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
//             Shop Now
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Index;

import Card from "components/Card";

function Index() {
  const cards = [
    { title: "Photography", description: "Capture life's beautiful moments." },
    {
      title: "Music",
      description: "Experience the magic of melody and rhythm.",
    },
    {
      title: "Videography",
      description: "Tell stories through moving images.",
    },
    { title: "Writing", description: "Express yourself through words." },
    { title: "Lifestyle", description: "Embrace the art of living well." },
    {
      title: "Art",
      description: "Explore creativity through colors and shapes.",
    },
    { title: "Programming", description: "Build the future through code." },
    { title: "Travel", description: "Discover the world’s hidden treasures." },
    {
      title: "Gaming",
      description: "Immerse in virtual worlds and entertainment.",
    },
    { title: "Wellness", description: "Nurture your mind, body, and soul." },
    { title: "Adventure", description: "Embark on thrilling journeys." },
    { title: "Culinary", description: "Discover the art of cooking." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-8">
      <div className="max-w-[90rem] mx-auto">
        <h1 className="text-4xl font-bold text-white/90 mb-12 text-center">
          Explore Your Passions
        </h1>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
