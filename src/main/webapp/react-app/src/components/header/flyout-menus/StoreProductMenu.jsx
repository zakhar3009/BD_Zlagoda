import { Fragment, useState } from "react";
import {Menu, Popover, Transition} from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { storeProductsCommandMap } from "@/constants/StoreProductsCommandName.js";
import { classNames } from "@/constants/utils/helpers.js";

export default function StoreProductMenu() {

    const storeProductsCommands = Array.from(storeProductsCommandMap.entries()).filter(
        (item) =>
            item[0] !== "DELETE_PRODUCT_IN_SHOP" && item[0] !== "POST_UPDATE_PRODUCT_IN_SHOP"
    );

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button
                    className="rounded-md px-3 py-2 text-sm font-medium outline-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="text-slate-300">Store Products</span>
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
                    {storeProductsCommands.map((item) => (
                        <Menu.Item key={item[0].toLowerCase()}>
                            {({active}) => (
                                <NavLink
                                    to={"/store-products/" + item[0].toLowerCase()}
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm font-medium text-gray-700"
                                    )}
                                >
                                    {item[1]}
                                </NavLink>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
