import React, {useEffect, useRef, useState} from "react";
import {categoriesTableMap} from "../../constants/CategoiesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {useReactToPrint} from "react-to-print";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";

export default function Category({command}) {
    const {auth} = useAuth();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const fetchCategoryData = async () => {
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
        fetchCategoryData();
    }, [command]);

    const deleteCategory = async (categoryId) => {
        console.log("deleting CATEGORY");
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_CATEGORY",
            },
            body: JSON.stringify({
                category_number: categoryId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            fetchCategoryData();
            toast.success("Category was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!");
        }
    };

    return (

        <div className="grid">
            {!isLoading && (
                <>
                    <MatTable
                        columnNames={categoriesTableMap.get(command)}
                        rows={data}
                        deleteFunc={deleteCategory}
                        deleteProperty={"number"}
                        pathToCreateUpdate={"/post_update_category"}
                        editEnabled={auth?.user?.role === Roles.MANAGER}
                        deleteEnabled={auth?.user?.role === Roles.MANAGER}
                        withActions={auth?.user?.role === Roles.MANAGER}
                    ></MatTable>
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={categoriesTableMap.get(command)}
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
