import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Hero from "./pages/Hero/Hero.jsx";
import Error from "./pages/Error/Error.jsx";
import Home from "./pages/Home/Home.jsx";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Shop from "./pages/Shop/Shop.jsx";
import Navbar from "./components/header/Navbar.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: '/home',
//         element: <Home />
//       },
//       {
//         path: '/shop',
//         element: <Shop />
//       }
//     ]
//   }
// ]);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<Hero />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="home" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="*" element={<Error />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);