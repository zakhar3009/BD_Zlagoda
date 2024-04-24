import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Navigate, NavLink, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";

export default function EmployeeButtonGroup ({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();
    const [alignment, setAlignment] = React.useState("get_all_employees");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        const routeName = location.pathname;
        return routeName === "/employee/post_add_employee"
            || routeName.includes("post_update_employee")
    }

    const employeeButtonGroup = () => {

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
                                        <ToggleButton value="get_all_employees">
                                            <NavLink to="get_all_employees">
                                                Get all employees
                                            </NavLink>
                                        </ToggleButton>
                                        <ToggleButton value="get_all_employees_order_by_surname">
                                            <NavLink to="get_all_employees_order_by_surname">
                                                Get all employees order by surname
                                            </NavLink>
                                        </ToggleButton>
                                        <ToggleButton value="get_all_cashiers_order_by_surname">
                                            <NavLink to="get_all_cashiers_order_by_surname">
                                                Get all cashiers order by surname
                                            </NavLink>
                                        </ToggleButton>
                                        <ToggleButton value="search_employee_address_and_phone_by_surname">
                                            <NavLink to="search_employee_address_and_phone_by_surname">
                                                Search employee address and phone by surname
                                            </NavLink>
                                        </ToggleButton>
                                        <ToggleButton value="get_cashiers_check_and_sales_report">
                                            <NavLink to="get_cashiers_check_and_sales_report">
                                                Get cashiers check and sales report
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

    return (
        allowedRoles.includes(auth?.user?.role)
            ? employeeButtonGroup()
            : auth?.user
                ? <Navigate to="/unauthorised" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}