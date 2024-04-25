import React, {useEffect, useRef, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";
import {useReactToPrint} from "react-to-print";
import {customerCardTableMap} from "@/constants/CustomerCardCommandMap.js";
import TableForPrint from "@/components/table/TableForPrint.jsx";

export default function ClientsWithoutCategoryPurchases() {
    const {auth} = useAuth();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const fetchAllCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_CATEGORIES",
                })
            );
            const data = await response.json();
            setCategories(data.map((item) => ({label: item.name, value: item.number})))
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const getAllClientsByCategory = async (name) => {
        if (!name) {
            setClients([]);
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "CUSTOMERS_WITHOUT_CATEGORY_PURCHASES",
                    category_name: name
                })
            );
            const data = await response.json();
            setClients(data);
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await getAllClientsByCategory(selectedCategory);
    };

    const deleteCustomer = async (customerId) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_CLIENT",
            },
            body: JSON.stringify({
                id: customerId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            await getAllClientsByCategory();
            toast.success("Customer was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!")
        }
    };

    return (<div className="grid">
            <form
                onSubmit={handleFormSubmit}
                className="grid sm:grid-cols-2 gap-3 mb-4"
            >
                <select
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="block h-full pl-3 w-full md:place-self-end sm:max-w-80 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value={null}></option>
                    {categories.map((item) => (
                        <option key={item.value} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="text-white md:max-w-64 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Search
                </button>
            </form>
            {!isLoading && (
                <>
                    <MatTable
                        columnNames={customerCardTableMap.get("GET_ALL_CLIENTS")}
                        rows={clients}
                        deleteFunc={deleteCustomer}
                        deleteProperty={"number"}
                        pathToCreateUpdate={"/post_update_client"}
                        editEnabled={true}
                        deleteEnabled={auth?.user?.role === Roles.MANAGER}
                        withActions={true}
                    ></MatTable>
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={customerCardTableMap.get("GET_ALL_CLIENTS")}
                            rows={clients}
                        />
                    </div>
                    <div className="flex justify-content-end mt-2">
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handlePrint}>To PDF
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
