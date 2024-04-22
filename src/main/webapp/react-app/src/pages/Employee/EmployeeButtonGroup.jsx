import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {NavLink, Outlet} from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function EmployeeButtonGroup() {
    const location = useLocation();
    const [alignment, setAlignment] = React.useState(location.pathname);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const checkRoute = () => {
        console.log(location.pathname)
        const routeName = location.pathname;
        return routeName === "/employee/post_add_employee"
            || routeName === "/employee/post_update_employee"
            || routeName === "/employee/delete_employee"
    }

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            {!checkRoute() &&
                <div className="flex justify-center items-center mb-4">
                    <ToggleButtonGroup
                        color="primary"
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
                    </ToggleButtonGroup>
                </div>}
            <Outlet />
        </main>
    )
}