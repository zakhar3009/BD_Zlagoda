import MatTable from "@/components/table/MatTable.jsx";
import React, {useEffect, useRef, useState} from "react";
import {customerCardTableMap} from "@/constants/CustomerCardCommandMap.js";
import {toast} from "react-toastify";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {useReactToPrint} from "react-to-print";
import {Roles} from "@/constants/auth/allowedRoles.js";
import useAuth from "@/hooks/auth/useAuth.js";

export default function CustomerCard({command}) {
    const { auth } = useAuth();
    const [customerCards, setCustomerCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
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
        } catch (err) {
            toast.error(`ERROR: ${err}`);
        }
    };

    useEffect(() => {
        fetchClientsData();
    }, [command]);

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
            const data = await response.json();
            fetchClientsData();
            toast.success("Customer was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!")
        }
    };

    return (
        <div className="grid">
            {!isLoading && (
                <>
                    <MatTable
                        columnNames={customerCardTableMap.get(command)}
                        rows={customerCards}
                        deleteFunc={deleteCustomer}
                        deleteProperty={"number"}
                        pathToCreateUpdate={"/post_update_client"}
                        editEnabled={true}
                        deleteEnabled={auth?.user?.role === Roles.MANAGER}
                    ></MatTable>
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={customerCardTableMap.get(command)}
                            rows={customerCards}
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
    )
}