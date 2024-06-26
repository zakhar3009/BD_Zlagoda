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
import {AuthProvider} from "@/context/AuthProvider.jsx";
import SearchClientsByPartOfSurname from "@/pages/CustomerCard/SearchClientsByPartOfSurname.jsx";
import StoreProduct from "@/pages/StoreProducts/StoreProduct.jsx";
import Profile from "@/pages/Profile/Profile.jsx";
import AddAndEditStoreProduct from "@/pages/StoreProducts/AddAndEditStoreProduct.jsx";
import Checks from "@/pages/Checks/Checks.jsx";
import AddNewCheck from "@/pages/Checks/AddNewCheck.jsx";
import StoreProductButtonGroup from "@/pages/StoreProducts/StoreProductButtonGroup.jsx";
import EmployeeButtonGroup from "@/pages/Employee/EmployeeButtonGroup.jsx";
import CategoryButtonGroup from "@/pages/Category/CategoryButtonGroup.jsx";
import ProductsButtonGroup from "@/pages/Products/ProductsButtonGroup.jsx";
import CustomerCardButtonGroup from "@/pages/CustomerCard/CustomerCardButtonGroup.jsx";
import WelcomePage from "@/pages/WelcomePage/WelcomePage.jsx";
import {Roles} from "@/constants/auth/allowedRoles.js";
import SearchStoreProductByUPC from "@/pages/StoreProducts/SearchStoreProductByUPC.jsx";
import RequireAuth from "@/components/auth/RequireAuth.jsx";
import SearchClientsAndCashierById from "@/pages/CustomerCard/SearchClientsAndCashierById.jsx";
import GetSelfCustomerByCity from "@/pages/CustomerCard/GetSelfCustomerByCity.jsx";
import SearchProductsByPartOfName from "@/pages/Products/SearchProductsByPartOfName.jsx";
import TopEmployeesBySales from "@/pages/Employee/TopEmployeesBySales.jsx";
import ClientsWithoutCategoryPurchases from "@/pages/CustomerCard/ClientsWithoutCategoryPurchases.jsx";
import GetCustomerCardsCheckedOutByCashier from "@/pages/CustomerCard/GetCustomerCardsCheckedOutByCashier.jsx";
import SearchCheckByNumber from "@/pages/Checks/SearchCheckByNumber.jsx";
import GetCustomerNoCashierCheckoutsThisYear from "@/pages/CustomerCard/GetCustomerNoCashierCheckoutsThisYear.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar/>}>
            <Route index element={<Hero/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path="user" element={<RequireAuth allowedRoles={[Roles.CASHIER, Roles.MANAGER]} />}>
                <Route path="profile" element={<Profile/>}/>
            </Route>
            <Route path="welcome" element={<WelcomePage/>}/>

            <Route path="employee" element={<EmployeeButtonGroup allowedRoles={[Roles.MANAGER]} />}>
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
                <Route path="get_cashiers_check_and_sales_report"
                       element={<Employee command={"GET_CASHIERS_CHECK_AND_SALES_REPORT"}/>}/>
                <Route path="get_top_employees_by_sales" element={<TopEmployeesBySales />} />
            </Route>

            <Route path="category" element={<CategoryButtonGroup allowedRoles={[Roles.MANAGER]} />}>
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

            <Route path="products" element={<ProductsButtonGroup allowedRoles={[Roles.CASHIER, Roles.MANAGER]}/>}>
                <Route
                    path="get_all_products_order_by_name"
                    element={<Products command={"GET_ALL_PRODUCTS_ORDER_BY_NAME"}/>}
                />
                <Route
                    path="get_products_by_category_order_by_name"
                    element={<ProductsByCategoryOrderByName/>}
                />
            </Route>
            <Route path="products" element={<ProductsButtonGroup allowedRoles={[Roles.MANAGER]}/>}>
                <Route path="post_add_product" element={<AddAndEditProduct/>}/>
                <Route path=":id/post_update_product" element={<AddAndEditProduct/>}/>
            </Route>
            <Route path="products" element={<ProductsButtonGroup allowedRoles={[Roles.CASHIER]}/>}>
                <Route path="search_product_by_part_of_name" element={<SearchProductsByPartOfName />}/>
            </Route>

            <Route path="customer-card"
                   element={<CustomerCardButtonGroup allowedRoles={[Roles.CASHIER, Roles.MANAGER]}/>}>
                {/*<Route*/}
                {/*    path="get_all_clients"*/}
                {/*    element={<CustomerCard command={"GET_ALL_CLIENTS"}/>}*/}
                {/*/>*/}
                <Route
                    path="get_all_clients_order_by_surname"
                    element={<CustomerCard command={"GET_ALL_CLIENTS_ORDER_BY_SURNAME"}/>}
                />
                <Route path=":id/post_update_client" element={<AddAndEditCustomerCard/>}/>

                <Route path="post_add_client" element={<AddAndEditCustomerCard/>}/>
                <Route path="get_customer_cards_checked_out_by_cashiers" element={<GetCustomerCardsCheckedOutByCashier/>}/>
            </Route>

            <Route path="customer-card" element={<CustomerCardButtonGroup allowedRoles={[Roles.CASHIER]}/>} >
                <Route path="get_clients_by_part_of_surname"
                       element={<SearchClientsByPartOfSurname command={"GET_CLIENTS_BY_PART_OF_SURNAME"}/>}
                />
            </Route>

            <Route path="customer-card" element={<CustomerCardButtonGroup allowedRoles={[Roles.MANAGER]}/>}>
                <Route path="get_clients_by_percent_order_by_surname" element={<SearchClientsByPartOfSurname command={"GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME"}/>}/>
                <Route path="customers_without_category_purchases" element={<ClientsWithoutCategoryPurchases />} />
                <Route path="get_served_clients_by_cities" element={<GetSelfCustomerByCity />}/>
                <Route path="get_clients_out_of_cashier_this_year" element={<GetCustomerNoCashierCheckoutsThisYear />}/>
            </Route>

            <Route path="store-products" element={<StoreProductButtonGroup allowedRoles={[Roles.MANAGER]}/>}>
                <Route path="get_all_products_in_shop_order_by_quantity"
                       element={<StoreProduct command={"GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY"}/>}/>
                <Route path="post_add_product_in_shop" element={<AddAndEditStoreProduct/>}/>
                <Route path=":id/post_update_product_in_shop" element={<AddAndEditStoreProduct/>}/>
            </Route>
            <Route path="store-products" element={<StoreProductButtonGroup allowedRoles={[Roles.CASHIER]}/>}>
                <Route path="get_all_products_in_shop_order_by_name"
                       element={<StoreProduct command={"GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME"}/>}/>
            </Route>
            <Route path="store-products"
                   element={<StoreProductButtonGroup allowedRoles={[Roles.MANAGER, Roles.CASHIER]}/>}>
                <Route path="get_prom_products_order_by_name"
                       element={<StoreProduct command={"GET_PROM_PRODUCTS_ORDER_BY_NAME"}/>}/>
                <Route path="get_prom_products_order_by_quantity"
                       element={<StoreProduct command={"GET_PROM_PRODUCTS_ORDER_BY_QUANTITY"}/>}/>
                <Route path="get_non_prom_products_order_by_quantity"
                       element={<StoreProduct command={"GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY"}/>}/>
                <Route path="get_non_prom_products_order_by_name"
                       element={<StoreProduct command={"GET_NON_PROM_PRODUCTS_ORDER_BY_NAME"}/>}/>
                <Route path="get_product_by_UPC" element={<SearchStoreProductByUPC/>}/>
            </Route>

            <Route path="checks" element={<RequireAuth allowedRoles={[Roles.MANAGER, Roles.CASHIER]} />}>
                <Route path="get_all_checks" element={<Checks/>}/>
                <Route path=":id/view_check_products" element={<Products/>}/>
            </Route>
            <Route path="checks" element={<RequireAuth allowedRoles={[Roles.CASHIER]} />}>
                <Route path="post_add_check" element={<AddNewCheck/>}/>
                <Route path="get_check_by_number" element={<SearchCheckByNumber />} />
            </Route>

        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);
