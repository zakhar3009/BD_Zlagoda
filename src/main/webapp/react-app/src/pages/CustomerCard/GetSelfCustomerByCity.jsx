import MatTable from "@/components/table/MatTable.jsx";
import React, {useEffect, useRef, useState} from "react";
import {customerCardTableMap} from "@/constants/CustomerCardCommandMap.js";
import {toast} from "react-toastify";
import useAuth from "@/hooks/auth/useAuth.js";

export default function GetSelfCustomerByCity() {
    const { auth } = useAuth();
    const [customerCards, setCustomerCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClientsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_SELF_COUNT_OF_CLIENTS_GROUPED_BY_CITY",
                    employee_id: auth.user.id
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

    useEffect(() => {
        fetchClientsData();
    }, []);

    return (
        <div className="grid">
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