// import { FC, useState } from "react";

// interface CardProps {
//   title: string;
//   description: string;
// }

// const Card: FC<CardProps> = ({ title, description }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative w-64 flex flex-col items-center space-y-2"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Normal View */}
//       <div
//         className="relative w-full h-20 bg-[#05032B] backdrop-blur-md shadow-lg rounded-full border
//       border-white/10 hover:border-white/20 hover:bg-gray-800/60 transition-all duration-300 flex items-center justify-center"
//       >
//         <h3 className="ml-3 text-sm font-semibold text-white/90 truncate">
//           {title}
//         </h3>
//       </div>

//       {/* Expanded View */}
//       {isHovered && (
//         <div
//           className="absolute top-full mt-2 w-80 bg-gray-900/90 backdrop-blur-2xl
//         rounded-xl shadow-xl overflow-hidden transition-opacity duration-300 z-50 p-4 border border-white/10 "
//         >
//           <p className="text-sm text-white/80 ">{description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;

// app/components/Card.tsx
// app/components/Card.tsx
// app/components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="group relative w-64 h-20 rounded-full bg-gray-800/40 backdrop-blur-md shadow-lg hover:w-96 hover:h-80 hover:rounded-3xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 hover:bg-gray-800/60">
      <div className="absolute inset-0 w-full h-full before:absolute before:inset-0 before:bg-gradient-to-t before:from-indigo-500/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
        {/* Initial pill state */}
        <div className="flex items-center h-full px-4 group-hover:opacity-0 transition-opacity duration-200">
          <h3 className="text-sm font-semibold text-white/90 truncate">
            {title}
          </h3>
        </div>

        {/* Expanded state */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <div className="p-6 bg-gray-900/50 backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300/90 line-clamp-3">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
