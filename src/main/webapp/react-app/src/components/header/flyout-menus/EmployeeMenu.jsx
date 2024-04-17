import { Fragment, useState, useEffect, useRef } from "react";
import { employeesCommandMap } from "../../../constants/EmployeesCommandMap.js";
import { Popover, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EmployeeMenu() {
  const [isOpen, setIsOpen] = useState(false);
    /*const buttonRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                panelRef.current &&
                !panelRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);*/

  const employeesCommands = Array.from(employeesCommandMap.entries()).filter(
    (item) =>
      item[0] !== "DELETE_EMPLOYEE" && item[0] !== "POST_UPDATE_EMPLOYEE"
  );

  return (
    <Popover className="relative">
      <Popover.Button
/*          ref={buttonRef}*/
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
        <span>Employees</span>
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
        <Popover.Panel className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4">
            {/*ref={panelRef}*/}
          <div className="w-screen max-w-xs flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-1">
              {employeesCommands.map((item) => (
                <div
                  key={item[0].toLowerCase()}
                  className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50"
                >
                  <NavLink
                    onClick={() => setIsOpen((prev) => !prev)}
                    to={"/employee/" + item[0].toLowerCase()}
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
