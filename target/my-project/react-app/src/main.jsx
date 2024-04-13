import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
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
import Employee from "./pages/Employee/Employee.jsx";
import SearchEmployee from "./pages/Employee/SearchEmployee.jsx";
import Category from "./pages/Category/Category.jsx";

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
      <Route path="employee">
        <Route
          path="get_all_employees"
          element={<Employee command={"GET_ALL_EMPLOYEES"} />}
        />
        <Route
          path="get_all_employees_order_by_surname"
          element={<Employee command={"GET_ALL_EMPLOYEES_ORDER_BY_SURNAME"} />}
        />
        <Route
          path="get_all_cashiers_order_by_surname"
          element={<Employee command={"GET_ALL_CASHIERS_ORDER_BY_SURNAME"} />}
        />
        <Route
          path="search_employee_address_and_phone_by_surname"
          element={<SearchEmployee />}
        />
        <Route path="post_add_employee" element={<Employee />} />
        <Route path="post_update_employee" element={<Employee />} />
        <Route path="delete_employee" element={<Employee />} />
      </Route>
      <Route path="category">
        <Route
          path="get_all_categories"
          element={<Category command={"GET_ALL_CATEGORIES"} />}
        />
        <Route
          path="get_all_categories_order_by_name"
          element={<Category command={"GET_ALL_CATEGORIES_ORDER_BY_NAME"} />}
        />
        <Route path="post_add_category" element={<Category />} />
        <Route path="post_update_category" element={<Category />} />
        <Route path="delete_category" element={<Category />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
