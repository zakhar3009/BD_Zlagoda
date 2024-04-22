import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {NavLink, Outlet, useLocation} from "react-router-dom";

export default function CustomerCardButtonGroup() {
    const location = useLocation();
    const [alignment, setAlignment] = React.useState("get_all_clients");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        const routeName = location.pathname;
        return routeName === "/customer-card/post_add_client"
            || routeName.includes("/post_update_client")
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
                                    <ToggleButton value="get_all_clients">
                                        <NavLink to="get_all_clients">
                                            Get all clients
                                        </NavLink>
                                    </ToggleButton>
                                    <ToggleButton value="get_all_clients_order_by_surname">
                                        <NavLink to="get_all_clients_order_by_surname">
                                            Get all clients order by surname
                                        </NavLink>
                                    </ToggleButton>
                                    <ToggleButton value="get_clients_by_percent_order_by_surname">
                                        <NavLink to="get_clients_by_percent_order_by_surname">
                                            Get clients by percent order by surname
                                        </NavLink>
                                    </ToggleButton>
                                    <ToggleButton value="get_clients_by_part_of_surname">
                                        <NavLink to="get_clients_by_part_of_surname">
                                            Search clients by part of surname
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