import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {NavLink, Outlet, useLocation} from "react-router-dom";

export default function CategoryButtonGroup() {
    const location = useLocation();
    const [alignment, setAlignment] = React.useState("get_all_categories");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        const routeName = location.pathname;
        return routeName === "/category/post_add_category"
            || routeName.includes("/post_update_category")
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
                                >
                                    <ToggleButton value="get_all_categories">
                                        <NavLink to="get_all_categories">
                                            Get all categories
                                        </NavLink>
                                    </ToggleButton>
                                    <ToggleButton value="get_all_categories_order_by_name">
                                        <NavLink to="get_all_categories_order_by_name">
                                            Get all categories order by name
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