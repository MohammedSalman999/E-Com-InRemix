import { FC, useState } from "react";

interface CardProps {
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-64 flex flex-col items-center space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Normal View */}
      <div
        className="relative w-full h-20 bg-[#05032B] backdrop-blur-md shadow-lg rounded-full border 
        border-white/10 hover:border-white/20 hover:bg-gray-800/60 transition-all duration-300 flex items-center justify-center"
      >
        <h3 className="ml-3 text-sm font-semibold text-white/90 truncate">
          {title}
        </h3>
      </div>

      {/* Expanded View */}
      {isHovered && (
        <div
          className="absolute top-full mt-2 w-80 bg-gray-900/90 backdrop-blur-2xl 
          rounded-xl shadow-xl overflow-hidden transition-opacity duration-300 z-50 p-4 border border-white/10 "
        >
          <p className="text-sm text-white/80 ">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;

// import { FC } from "react";
// import { createPortal } from "react-dom";

// interface CardProps {
//   icon: JSX.Element;
//   title: string;
//   description: string;
//   image: string;
//   isExpanded: boolean;
//   onExpand: () => void;
//   onClose: () => void;
// }

// const Card: FC<CardProps> = ({
//   icon,
//   title,
//   description,
//   image,
//   isExpanded,
//   onExpand,
//   onClose,
// }) => {
//   return (
//     <div className="relative w-full flex flex-col items-center space-y-4">
//       {/* Normal View */}
//       <button
//         className="relative w-64 h-20 bg-gray-800/40 backdrop-blur-md shadow-lg rounded-full cursor-pointer
//         border border-white/10 hover:border-white/20 hover:bg-gray-800/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         onClick={onExpand}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             onExpand();
//           }
//         }}
//       >
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//           <div className="p-3 rounded-full bg-white/10 text-indigo-300 backdrop-blur-xl shadow-inner border border-white/20">
//             {icon}
//           </div>
//           <h3 className="ml-3 text-sm font-semibold text-white/90 truncate">
//             {title}
//           </h3>
//         </div>
//       </button>

//       {/* Expanded View */}
//       {isExpanded &&
//         createPortal(
//           <div
//             role="button"
//             tabIndex={0}
//             className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl z-50"
//             onClick={onClose}
//             onKeyDown={(e) => {
//               if (e.key === "Escape") onClose();
//             }}
//           >
//             <div
//               role="dialog"
//               aria-modal="true"
//               className="relative w-80 h-96 bg-gray-900/90 backdrop-blur-2xl rounded-xl shadow-xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={image}
//                 alt={title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
//                 <p className="text-gray-300">{description}</p>
//               </div>
//               <button
//                 className="absolute top-2 right-2 bg-white/20 px-3 py-1 text-sm text-white rounded-md hover:bg-white/30"
//                 onClick={onClose}
//               >
//                 ✕
//               </button>
//             </div>
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// };

// export default Card;
