// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// const LogoutToast = () => {
//   const [show, setShow] = useState(false);
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const toastFlag = localStorage.getItem("showLogoutToast");
//       if (toastFlag) {
//         setShow(true);
//         localStorage.removeItem("showLogoutToast");

//         let interval = setInterval(() => {
//           setProgress((prev) => {
//             if (prev <= 0) {
//               clearInterval(interval);
//               setShow(false);
//               return 0;
//             }
//             return prev - 2;
//           });
//         }, 100);
//       }
//     }
//   }, []);

//   if (!show) return null;

//   return (
//     <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white border border-pink-300 shadow-lg rounded-xl px-6 py-4 z-50 w-[300px] text-center animate-fade-in">
//       <p className="text-gray-800 mb-2">
//         Logged out successfully.{" "}
//         <Link href="/Login" className="text-pink-600 underline font-semibold">
//           Login again!
//         </Link>
//       </p>
//       <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-pink-500 transition-all duration-100"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default LogoutToast;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LogoutToast = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const toastFlag = localStorage.getItem("showLogoutToast");
      if (toastFlag) {
        setShow(true);
        localStorage.removeItem("showLogoutToast");

        let interval = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              setShow(false);
              return 0;
            }
            return prev - 3.33; // 100% to 0% in ~3 seconds
          });
        }, 100);
      }
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999] flex items-center justify-center transition-all duration-300">
      <div className="bg-white px-6 py-5 rounded-xl shadow-lg text-center w-[320px]">
        <p className="text-gray-800 mb-3">
          Logged out successfully.{" "}
          <Link href="/Login" className="text-pink-600 no-underline font-normal">
            Login
          </Link>
          {" "}again!
        </p>
        <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LogoutToast;

