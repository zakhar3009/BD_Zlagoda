import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { storeProductsCommandMap } from "@/constants/StoreProductsCommandName.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StoreProductMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const storeProductsCommands = Array.from(storeProductsCommandMap.entries()).filter(
        (item) =>
            item[0] !== "DELETE_PRODUCT_IN_SHOP" && item[0] !== "POST_UPDATE_PRODUCT_IN_SHOP"
    );

    return (
        <Popover className="relative">
            <Popover.Button
                onClick={() => setIsOpen((prev) => !prev)}
                className={({ isActive }) => {
                    return classNames(
                        isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium outline-0"
                    );
                }}
            >
                <span>Store Products</span>
            </Popover.Button>

            <Transition
                show={isOpen}
                as={Fragment}
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                entered="opacity-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel onBlur={() => setIsOpen((prev) => !prev)} className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4">
                    <div className="w-screen max-w-xs flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-1">
                            {storeProductsCommands.map((item) => (
                                <div
                                    key={item[0].toLowerCase()}
                                    className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50"
                                >
                                    <NavLink
                                        onClick={() => setIsOpen((prev) => !prev)}
                                        to={"/store-products/" + item[0].toLowerCase()}
                                        className="font-semibold text-gray-900"
                                    >
                                        {item[1]}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}
