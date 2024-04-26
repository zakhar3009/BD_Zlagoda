import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Navigate, NavLink, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";
import {customerCardCommands} from "@/constants/CustomerCardCommandMap.js";

export default function CustomerCardButtonGroup({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();
    const [alignment, setAlignment] = React.useState("get_all_clients_order_by_surname");
    const routeName = location.pathname;

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        return routeName === "/customer-card/post_add_client" || routeName.includes("/post_update_client")
    }

    const hasPermissionOnBtn = (item) => {
        if(!item.allowedRoles.includes(auth?.user?.role)) return;
        if(item.path === "post_add_client" || item.path === "post_update_client")
            return;
        return (
            <ToggleButton key={item.path} value={item.path}>
                <NavLink to={item.path}>
                    {item.title}
                </NavLink>
            </ToggleButton>
        );
    }

    const customerCardButtonGroup = () => {
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
                                        {customerCardCommands.map((item) => hasPermissionOnBtn(item))}
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>}
                <Outlet/>
            </main>
        );
    }

    const allowedRoute = () => {
        const route = customerCardCommands.find(
            (item) => routeName.includes(item.path)) || {allowedRoles: []};
        return route.allowedRoles.includes(auth?.user?.role)
    }

    return (
        allowedRoles.includes(auth?.user?.role)
        && allowedRoute()
            ? customerCardButtonGroup()
            : auth?.user
                ? <Navigate to="/unauthorised" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}