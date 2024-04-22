import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import Card from './../../components/cards/Card.jsx'

export default function StoreProductButtonGroup() {
    const location = useLocation();
    const [alignment, setAlignment] = React.useState("get_all_products_in_shop");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        const routeName = location.pathname;
        return routeName === "/store-products/post_add_product_in_shop"
            || routeName.includes("/post_update_product_in_shop")
    }

    return (
        <main className={`px-8 py-1/2 ${!checkRoute() ? "h-screen" : "h-full"} bg-gradient-to-r from-violet-200 to-pink-200`}>
            {!checkRoute() &&
            <div className="flex justify-center items-center mb-4">
                <Card>
                    <ToggleButtonGroup
                        color="secondary"
                        value={alignment}
                        size={"small"}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        selectedColor="#00abc0"
                    >
                        <ToggleButton value="get_all_products_in_shop">
                            <NavLink to="get_all_products_in_shop">
                                Get all products in shop
                            </NavLink>
                        </ToggleButton>
                        <ToggleButton value="get_all_products_in_shop_order_by_quantity">
                            <NavLink to="get_all_products_in_shop_order_by_quantity">
                                Get all store products order by quantity
                            </NavLink>
                        </ToggleButton>
                        <ToggleButton value="get_prom_products_order_by_name">
                            <NavLink to="get_prom_products_order_by_name">
                                Get all prom products order by name
                            </NavLink>
                        </ToggleButton>
                        <ToggleButton value="get_prom_products_order_by_quantity">
                            <NavLink to="get_prom_products_order_by_quantity">
                                Get all prom products order by quantity
                            </NavLink>
                        </ToggleButton>
                        <ToggleButton value="get_non_prom_products_order_by_name">
                            <NavLink to="get_non_prom_products_order_by_name">
                                Get all non prom products order by name
                            </NavLink>
                        </ToggleButton>
                        <ToggleButton value="get_non_prom_products_order_by_quantity">
                            <NavLink to="get_non_prom_products_order_by_quantity">
                                Get all non prom products order by quantity
                            </NavLink>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Card>
            </div>}
            <Outlet/>
        </main>
    )
}