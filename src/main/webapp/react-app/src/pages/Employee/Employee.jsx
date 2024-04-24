import React, {useEffect, useRef, useState} from "react";
import {employeesTableMap} from "../../constants/EmployeesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {useReactToPrint} from 'react-to-print';
import TableForPrint from "@/components/table/TableForPrint.jsx";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";

export default function Employee({command}) {
    const {auth} = useAuth();
    const [data, setData] = useState(null);
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
                    command_name: command,
                })
            );
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        fetchEmployeesData();
    }, [command]);

    const deleteEmployee = async (employeeId) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_EMPLOYEE",
            },
            body: JSON.stringify({
                id: employeeId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            fetchEmployeesData();
            toast.success("Employee was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!");
        }
    };
    return (
            <div className="grid">
                {!isLoading && (
                    <>
                        <MatTable
                            columnNames={employeesTableMap.get(command)}
                            rows={data}
                            deleteFunc={deleteEmployee}
                            deleteProperty={"id"}
                            pathToCreateUpdate={"/post_update_employee"}
                            editEnabled={auth?.user?.role === Roles.MANAGER}
                            deleteEnabled={auth?.user?.role === Roles.MANAGER}
                        ></MatTable>
                        <div ref={componentRef}>
                            <TableForPrint
                                columnNames={employeesTableMap.get(command)}
                                rows={data}
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
