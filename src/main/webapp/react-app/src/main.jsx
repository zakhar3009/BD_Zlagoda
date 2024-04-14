import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import Hero from "./pages/Hero/Hero.jsx";
import Error from "./pages/Error/Error.jsx";
import "./index.css";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Navbar from "./components/header/Navbar.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import Employee from "./pages/Employee/Employee.jsx";
import SearchEmployee from "./pages/Employee/SearchEmployee.jsx";
import Category from "./pages/Category/Category.jsx";
import AddAndEditEmployee from "./pages/Employee/AddAndEditEmployee.jsx";
import AddAndEditCategory from "./pages/Category/AddAndEditCategory.jsx";
import Products from "./pages/Products/Products.jsx";
import ProductsByCategoryOrderByName from "@/pages/Products/ProductsByCategoryOrderByName.jsx";
import AddAndEditProduct from "@/pages/Products/AddAndEditProduct.jsx";
import CustomerCard from "@/pages/CustomerCard/CustomerCard.jsx";
import AddAndEditCustomerCard from "@/pages/CustomerCard/AddAndEditCustomerCard.jsx";

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
        <Route path="/" element={<Navbar/>}>
            <Route index element={<Hero/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path="employee">
                <Route
                    path="get_all_employees"
                    element={<Employee command={"GET_ALL_EMPLOYEES"}/>}
                />
                <Route
                    path="get_all_employees_order_by_surname"
                    element={<Employee command={"GET_ALL_EMPLOYEES_ORDER_BY_SURNAME"}/>}
                />
                <Route
                    path="get_all_cashiers_order_by_surname"
                    element={<Employee command={"GET_ALL_CASHIERS_ORDER_BY_SURNAME"}/>}
                />
                <Route
                    path="search_employee_address_and_phone_by_surname"
                    element={<SearchEmployee/>}
                />
                <Route path="post_add_employee"
                       element={<AddAndEditEmployee/>}
                />
                <Route path=":id/post_update_employee"
                       element={<AddAndEditEmployee/>}
                />
            </Route>

            <Route path="category">
                <Route
                    path="get_all_categories"
                    element={<Category command={"GET_ALL_CATEGORIES"}/>}
                />
                <Route
                    path="get_all_categories_order_by_name"
                    element={<Category command={"GET_ALL_CATEGORIES_ORDER_BY_NAME"}/>}
                />
                <Route path="post_add_category" element={<AddAndEditCategory/>}/>
                <Route path=":id/post_update_category" element={<AddAndEditCategory/>}/>
            </Route>

            <Route path="products">
                <Route
                    path="get_all_products"
                    element={<Products command={"GET_ALL_PRODUCTS"}/>}
                />
                <Route
                    path="get_all_products_order_by_name"
                    element={<Products command={"GET_ALL_PRODUCTS_ORDER_BY_NAME"}/>}
                />
                <Route
                    path="get_products_by_category_order_by_name"
                    element={<ProductsByCategoryOrderByName />}
                />
                <Route path="post_add_product" element={<AddAndEditProduct />}/>
                <Route path=":id/post_update_product" element={<AddAndEditProduct />}/>
                {/*<Route*/}
                {/*    path="get_all_products_bpost_update_categoryy_upc"*/}
                {/*    element={<Products command={"GET_PRODUCT_BY_UPC"}/>}*/}
                {/*/>*/}
            </Route>

            <Route path="customer-card">
                <Route
                    path="get_all_clients"
                    element={<CustomerCard command={"GET_ALL_CLIENTS"}/>}
                />
                <Route
                    path="get_all_clients_order_by_surname"
                    element={<CustomerCard command={"GET_ALL_CLIENTS_ORDER_BY_SURNAME"}/>}
                />
                <Route path="get_clients_by_percent_order_by_surname" element={<CustomerCard command={"GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME"}/>}/>
                <Route path="post_add_client" element={<AddAndEditCustomerCard />}/>
                <Route path=":id/post_update_client" element={<AddAndEditCustomerCard />}/>
            </Route>


        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
