import { Outlet } from "@remix-run/react";

export default function CustomLayout() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex flex-col overflow-auto">
      {/* Header */}
      <header className="h-[20%] bg-[#05032B] shadow-md flex items-center justify-between px-8">
        <div>
          {" "}
          <img
            className="w-[220px] py-3 "
            src="/images/logo.png"
            alt="Placeholder"
          />
        </div>
        <div className="flex items-center space-x-2 p-3">
          {/* <span className="text-[#38A4E0] text-3xl font-bold">The</span>
          <span className="text-[#38A4E0] text-3xl font-bold">Build</span>
          <span className="text-[#FF903E] text-3xl font-bold">Mall</span> */}
        </div>
        {/* Header SVG Icons */}

        <div className="flex items-center space-x-4">
          <div data-svg-wrapper>
            <svg
              width="30"
              height="30"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.5625 18.8125C29.5625 23.2738 25.9613 26.875 21.5 26.875C17.0388 26.875 13.4375 23.2738 13.4375 18.8125C13.4375 14.3513 17.0388 10.75 21.5 10.75C25.9613 10.75 29.5625 14.3513 29.5625 18.8125Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M43 21.5C43 33.3787 33.3787 43 21.5 43C9.62125 43 0 33.3787 0 21.5C0 9.62125 9.62125 0 21.5 0C33.3787 0 43 9.62125 43 21.5ZM10.75 36.9531C11.18 36.2383 15.3456 29.5625 21.4731 29.5625C27.5737 29.5625 31.7662 36.2544 32.1962 36.9531C34.6953 35.225 36.7371 32.9158 38.1462 30.2239C39.5554 27.5321 40.2895 24.5383 40.2856 21.5C40.2856 11.0994 31.8737 2.6875 21.4731 2.6875C11.0725 2.6875 2.66062 11.0994 2.66062 21.5C2.66062 27.8962 5.85875 33.5669 10.75 36.9531Z"
                fill="white"
              />
            </svg>
          </div>
          <div data-svg-wrapper>
            <svg
              width="25"
              height="25"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8 24.8C23.0795 24.8 21.7 26.1795 21.7 27.9C21.7 28.7222 22.0266 29.5107 22.608 30.092C23.1893 30.6734 23.9778 31 24.8 31C25.6222 31 26.4107 30.6734 26.992 30.092C27.5734 29.5107 27.9 28.7222 27.9 27.9C27.9 27.0778 27.5734 26.2893 26.992 25.708C26.4107 25.1266 25.6222 24.8 24.8 24.8ZM0 0V3.1H3.1L8.68 14.8645L6.572 18.662C6.3395 19.096 6.2 19.6075 6.2 20.15C6.2 20.9722 6.52661 21.7607 7.10797 22.342C7.68933 22.9234 8.47783 23.25 9.3 23.25H27.9V20.15H9.951C9.84823 20.15 9.74967 20.1092 9.677 20.0365C9.60433 19.9638 9.5635 19.8653 9.5635 19.7625C9.5635 19.685 9.579 19.623 9.61 19.5765L11.005 17.05H22.5525C23.715 17.05 24.738 16.399 25.265 15.4535L30.814 5.425C30.9225 5.177 31 4.9135 31 4.65C31 4.23891 30.8367 3.84467 30.546 3.55398C30.2553 3.2633 29.8611 3.1 29.45 3.1H6.5255L5.0685 0M9.3 24.8C7.5795 24.8 6.2 26.1795 6.2 27.9C6.2 28.7222 6.52661 29.5107 7.10797 30.092C7.68933 30.6734 8.47783 31 9.3 31C10.1222 31 10.9107 30.6734 11.492 30.092C12.0734 29.5107 12.4 28.7222 12.4 27.9C12.4 27.0778 12.0734 26.2893 11.492 25.708C10.9107 25.1266 10.1222 24.8 9.3 24.8Z"
                fill="white"
              />
            </svg>
          </div>
          <div data-svg-wrapper>
            <svg
              width="28"
              height="28"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 31.195L14.535 28.951C5.78 21.012 0 15.759 0 9.35C0 4.097 4.114 0 9.35 0C12.308 0 15.147 1.377 17 3.536C18.853 1.377 21.692 0 24.65 0C29.886 0 34 4.097 34 9.35C34 15.759 28.22 21.012 19.465 28.951L17 31.195Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="h-28 bg-[#05032B] flex ">
        {/* <div className="flex justify-start p-3">
          <span className="text-[#38A4E0] text-5xl font-bold">The</span>
          <span className="text-[#38A4E0] text-5xl font-bold">Build</span>
          <span className="text-[#FF903E] text-5xl font-bold">Mall</span>
        </div> */}
        <div className="px-8">
          {" "}
          <img
            className="w-[250px] pt-3 "
            src="/images/logo.png"
            alt="Placeholder"
          />
        </div>
      </footer>
    </div>
  );
}

// <Link to={"/thebuildmall/products"}>Products</Link>
//         <h1 className="text-center text-black text-3xl font-bold leading-tight">
//           The One Stop Shop For All Your
//           <br /> Construction Needs
//         </h1>
//         ;{/* Products Section */}
//         <section className="w-full max-w-6xl px-4 mt-8">
//           <Link
//             to="/products"
//             className="block text-black text-2xl font-bold text-center mb-8"
//           >
//             Products
//           </Link>

//           <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-8">
//             <div className="max-w-7xl mx-auto">
//               {/* 🔥 Grid wrapper with relative positioning */}
//               <div className="relative z-0">
//                 {/* 🔥 Overlay that hides below cards when any card expands */}
//                 <div
//                   className="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0
//         transition-opacity duration-300 pointer-events-none group-hover:opacity-100 z-40"
//                 ></div>

//                 {/* 🔥 Grid of cards */}
//                 <div className="grid grid-cols-3 gap-6 relative z-20">
//                   {cards.map((card, index) => (
//                     <div key={index} className="relative group">
//                       <Card {...card} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Shop Now Button */}
//           <div className="mt-8 flex justify-center">
//             <Link
//               to="/products"
//               className="relative inline-block transition-transform hover:scale-105"
//             >
//               <img
//                 className="w-48 h-12"
//                 src="/images/rectangle-11.svg"
//                 alt="Shop Now Background"
//               />
//               <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
//                 Shop Now
//               </span>
//             </Link>
//           </div>
//         </section>
