import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {NavLink, Outlet, useLocation} from "react-router-dom";

export default function ProductsButtonGroup() {
    const location = useLocation();
    const [alignment, setAlignment] = React.useState("get_all_products");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        const routeName = location.pathname;
        return routeName === "/products/post_add_product"
            || routeName.includes("/post_update_product")
    }

    return (
        <main
            className={`px-8 py-1/2 ${!checkRoute() ? "h-screen" : "h-full"} bg-gradient-to-r from-violet-200 to-pink-200`}>
            {!checkRoute() &&
                <div className="flex justify-center items-center mb-4">
                    <div className={`w-auto bg-gradient-to-r from-violet-200 to-pink-200 pt-2 pb-2`}>
                        <div className={`mx-auto shadow-2xl mt-3 p-4 rounded-2xl bg-white`}>
                            <div className="flex justify-center">
                                <ToggleButtonGroup
                                    color="secondary"
                                    value={alignment}
                                    size={"small"}
                                    exclusive
                                    onChange={handleChange}
                                    aria-label="Platform"
                                    selectedColor="#00abc0"
                                >
                                    <ToggleButton value="get_all_products">
                                        <NavLink to="get_all_products">
                                            Get all products
                                        </NavLink>
                                    </ToggleButton>
                                    <ToggleButton value="get_all_products_order_by_name">
                                        <NavLink to="get_all_products_order_by_name">
                                            Get all products order by name
                                        </NavLink>
                                    </ToggleButton><
                                    ToggleButton value="get_products_by_category_order_by_name">
                                        <NavLink to="get_products_by_category_order_by_name">
                                            Get products by category order by name
                                        </NavLink>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>}
            <Outlet/>
        </main>
    )
}