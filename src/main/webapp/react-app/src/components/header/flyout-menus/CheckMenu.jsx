import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {NavLink} from "react-router-dom";
import {classNames} from "@/constants/utils/helpers.js";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";

export default function ChecksMenu() {
    const { auth } = useAuth();

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button
                    className="rounded-md px-3 py-2 text-sm font-medium outline-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="text-slate-300">Checks</span>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute left-1/2 z-10 -translate-x-1/2 mt-4 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({active}) => (
                            <NavLink
                                to="/checks/get_all_checks"
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm font-medium text-gray-700"
                                )}
                            >
                                Checks
                            </NavLink>
                        )}
                    </Menu.Item>
                    {auth?.user?.role === Roles.CASHIER && (
                        <Menu.Item>
                            {({active}) => (
                                <NavLink
                                    to="/checks/get_check_by_number"
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm font-medium text-gray-700"
                                    )}
                                >
                                    Search check by number
                                </NavLink>
                            )}
                        </Menu.Item>
                    )}
                    {auth?.user?.role === Roles.CASHIER && (
                        <Menu.Item>
                        {({active}) => (
                            <NavLink
                                to="/checks/post_add_check"
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm font-medium text-gray-700"
                                )}
                            >
                               Add new check
                            </NavLink>
                        )}
                    </Menu.Item>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
