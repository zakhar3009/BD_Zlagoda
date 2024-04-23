import {Fragment, useEffect} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {NavLink, Outlet} from "react-router-dom";
import {classNames} from "@/constants/utils/helpers.js";
import EmployeeMenu from "./flyout-menus/EmployeeMenu";
import CategoryMenu from "./flyout-menus/CategoryMenu";
import ProductMenu from "./flyout-menus/ProductMenu.jsx";
import {Bounce, ToastContainer} from "react-toastify";
import CustomerCardMenu from './flyout-menus/CustomerCardMenu.jsx';
import "react-toastify/dist/ReactToastify.css";
import StoreProductMenu from "@/components/header/flyout-menus/StoreProductMenu.jsx";
import useAuth from "@/hooks/auth/useAuth.js";
import ChecksMenu from "@/components/header/flyout-menus/Checks.jsx";
import {Roles} from "@/constants/auth/allowedRoles.js";

const navigation = [
    {menu: <EmployeeMenu/>, allowedRoles: [Roles.MANAGER]},
    {menu: <CategoryMenu/>, allowedRoles: [Roles.MANAGER]},
    {menu: <ProductMenu/>, allowedRoles: [Roles.MANAGER, Roles.CASHIER]},
    {menu: <CustomerCardMenu/>, allowedRoles: [Roles.MANAGER, Roles.CASHIER]},
    {menu: <StoreProductMenu/>, allowedRoles: [Roles.MANAGER, Roles.CASHIER]},
    {menu: <ChecksMenu/>, allowedRoles: [Roles.MANAGER, Roles.CASHIER]}
];

export default function Navbar() {
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        const userInfo = sessionStorage.getItem("user");
        console.log("User", JSON.parse(userInfo));
        if(userInfo) setAuth({
            user: JSON.parse(userInfo)
        })
    }, []);

    const allowedNav = navigation.filter(
        (menu) => menu.allowedRoles.includes(auth?.user?.role)
    );

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({open}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button
                                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5"/>
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                                    <div className="flex flex-shrink-0 items-center">
                                        <NavLink to={auth?.user?.role ? "/welcome" : "/"}>
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block ">
                                        <div className="flex space-x-4 ml-12">
                                            {allowedNav.map(
                                                (item, index) => <div key={index}>{item.menu}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                                                    alt=""
                                                />
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
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {auth?.user && <Menu.Item>
                                                    {({active}) => (
                                                        <NavLink
                                                            to="/profile"
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            Your Profile
                                                        </NavLink>
                                                    )}
                                                </Menu.Item>}
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <NavLink
                                                            to={auth?.user ? "/" : "/login"}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            {auth?.user ? "Sign out" : "Sign In"}
                                                        </NavLink>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        {/* <Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel> */}
                    </>
                )}
            </Disclosure>
            <Outlet/>
            <ToastContainer
                position="top-center"
                autoClose={2300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
}
