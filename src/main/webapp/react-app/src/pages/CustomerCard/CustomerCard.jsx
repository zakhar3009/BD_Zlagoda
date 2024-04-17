import MatTable from "@/components/table/MatTable.jsx";
import React, {useEffect, useState} from "react";
import {customerCardTableMap} from "@/constants/CustomerCardCommandMap.js";
import {toast} from "react-toastify";

export default function CustomerCard({ command }) {
    const [customerCards, setCustomerCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClientsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                })
            );
            const data = await response.json();
            setCustomerCards(data);
            setIsLoading(false);
            console.log("LOADED CLIENTS",data);
        } catch (err) {
            toast.error(`ERROR: ${err}`);
        }
    };

    useEffect(() => {
        fetchClientsData();
    }, [command]);

    const deleteCustomer= async (customerId) => {
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
            const data = await response.json();
            fetchClientsData();
            toast.success("Customer was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return(
        <main className="px-8 py-4">
            <div className="grid">
                {!isLoading && (
                    <MatTable
                        columnNames={customerCardTableMap.get(command)}
                        rows={customerCards}
                        deleteFunc={deleteCustomer}
                        deleteProperty={"UPC"}
                        pathToCreateUpdate={"/post_update_client"}
                    ></MatTable>
                )}
            </div>
        </main>
    )
}