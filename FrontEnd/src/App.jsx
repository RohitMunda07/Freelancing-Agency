// import React, { useState } from "react";
// import PublicSite from "./components/site/PublicSite.jsx";
// import LoginScreen from "./components/portal/LoginScreen.jsx";
// import Dashboard from "./components/portal/Dashboard.jsx";
// import { ThemeProvider } from "./context/ThemeContext.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google"
// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import RazorpayCheckout from "./components/Razorpay/RazorpayCheckout.jsx";

// // view: "site" | "login" | "dashboard"
// export default function App() {
//   const [view, setView] = useState("site");

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <BrowserRouter>
//         <ThemeProvider>
//           <div className="min-h-screen bg-ink">
//             {view === "site" && <PublicSite onLogin={() => setView("login")} />}
//             {view === "login" && (
//               <LoginScreen onLogin={() => setView("dashboard")} onBack={() => setView("site")} />
//             )}
//             {view === "dashboard" && <Dashboard onLogout={() => setView("site")} />}
//           </div>
//         </ThemeProvider>
//         <Routes>
//           <Route path="/checkout" element={<RazorpayCheckout />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </GoogleOAuthProvider>
//   );
// }


import React, { useState } from "react";

import PublicSite from "./components/site/PublicSite.jsx";
import LoginScreen from "./components/portal/LoginScreen.jsx";
import Dashboard from "./components/portal/Dashboard.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import RazorpayCheckout from "./components/Razorpay/RazorpayCheckout.jsx";


// view: "site" | "login" | "dashboard"
function AppContent() {

  const [view, setView] = useState("site");

  const location = useLocation();

  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <ThemeProvider>

      {/* Don't render the normal application UI on checkout */}
      {!isCheckoutPage && (
        <div className="min-h-screen bg-ink">

          {view === "site" && (
            <PublicSite
              onLogin={() => setView("login")}
            />
          )}

          {view === "login" && (
            <LoginScreen
              onLogin={() => setView("dashboard")}
              onBack={() => setView("site")}
            />
          )}

          {view === "dashboard" && (
            <Dashboard
              onLogout={() => setView("site")}
            />
          )}

        </div>
      )}

      <Routes>

        <Route
          path="/checkout"
          element={<RazorpayCheckout />}
        />

      </Routes>

    </ThemeProvider>
  );
}


export default function App() {

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >

      <BrowserRouter>

        <AppContent />

      </BrowserRouter>

    </GoogleOAuthProvider>
  );
}