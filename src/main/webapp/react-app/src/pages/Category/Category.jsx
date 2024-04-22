import React, {useEffect, useRef, useState} from "react";
import {categoriesTableMap} from "../../constants/CategoiesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {storeProductTablePrintMap} from "@/constants/StoreProductsCommandMap.js";
import {useReactToPrint} from "react-to-print";

// GET_ALL_CATEGORIES
export default function Category({command}) {
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
            console.log(data);
        } catch (err) {
            console.log(err);
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
            const data = await response.json();
            fetchCategoryData();
            console.log(data);
            toast.success("Category was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading && (
                    <>
                        <MatTable
                            columnNames={categoriesTableMap.get(command)}
                            rows={data}
                            deleteFunc={deleteCategory}
                            deleteProperty={"number"}
                            pathToCreateUpdate={"/post_update_category"}
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
        </main>
    );
}
