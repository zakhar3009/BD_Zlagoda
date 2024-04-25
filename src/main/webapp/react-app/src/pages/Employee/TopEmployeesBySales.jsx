import React, {useEffect, useRef, useState} from "react";
import {employeesTableMap} from "@/constants/EmployeesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {useReactToPrint} from 'react-to-print';
import TableForPrint from "@/components/table/TableForPrint.jsx";

export default function TopEmployeesBySales() {
    const [topEmployees, setTopEmployees] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const fetchEmployeesData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_TOP_EMPLOYEES_BY_SALES",
                })
            );
            const data = await response.json();
            setTopEmployees(data)
            setIsLoading(false);
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        fetchEmployeesData();
    }, []);

    return (
        <div className="grid">
            {!isLoading && (
                <>
                    <MatTable
                        columnNames={employeesTableMap.get("GET_TOP_EMPLOYEES_BY_SALES")}
                        rows={topEmployees}
                    ></MatTable>
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={employeesTableMap.get("GET_TOP_EMPLOYEES_BY_SALES")}
                            rows={topEmployees}
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
