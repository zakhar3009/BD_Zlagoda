import MatTable from "@/components/table/MatTable.jsx";
import React, {useEffect, useRef, useState} from "react";
import {customerCardTableMap} from "@/constants/CustomerCardCommandMap.js";
import {toast} from "react-toastify";
import useAuth from "@/hooks/auth/useAuth.js";

export default function GetSelfCustomerByCity() {
    const { auth } = useAuth();
    const [customerCards, setCustomerCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [employee_id, setEmployee_id] = useState("");
    const [customers, setCustomers] = useState();

    const fetchClientsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_SELF_COUNT_OF_CLIENTS_GROUPED_BY_CITY",
                    employee_id: employee_id
                })
            );
            const data = await response.json();
            setCustomerCards(Object.keys(data).map((item) => ({
                city: item,
                clients_count: data[item]
                })
            ));
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchClientsData();
    };

    return (
        <div className="grid">
            <form
                onSubmit={handleFormSubmit}
                className="grid sm:grid-cols-2 gap-3 mb-4"
            >
                <input
                    type="text"
                    id="default-input"
                    placeholder="Employee id.."
                    value={employee_id}
                    onChange={(event) => {
                        setEmployee_id(event.target.value);
                    }}
                    className="bg-gray-50 md:place-self-end sm:max-w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
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
                        columnNames={customerCardTableMap.get("GET_SELF_COUNT_OF_CLIENTS_GROUPED_BY_CITY")}
                        rows={customerCards}
                    ></MatTable>
                </>
            )}
        </div>
    )
}