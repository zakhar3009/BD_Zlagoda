import React, {useEffect, useRef, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {productsTableMap} from "@/constants/ProductsCommandMap.js";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {useReactToPrint} from "react-to-print";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";

export default function Products({command, properties}) {
    const { auth } = useAuth();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const fetchProductsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                    ...properties
                })
            );
            const data = await response.json();
            setData(data.map(
                (item) => ({
                    id: item.id,
                    name: item.name,
                    characteristic: item.characteristic,
                    category_number: item.category.number,
                    category_name: item.category.name
                })
            ));
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchProductsData();
    }, [command]);

    const deleteProduct = async (productId) => {
        console.log("deleting PRODUCT");
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_PRODUCT",
            },
            body: JSON.stringify({
                id_product: productId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            fetchProductsData();
            toast.success("Product was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return (
        <div className="grid">
            {!isLoading && (
                <>
                    <MatTable
                        columnNames={productsTableMap.get(command)}
                        rows={data}
                        deleteFunc={deleteProduct}
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_product"}
                        deleteEnabled={auth?.user?.role === Roles.MANAGER}
                        editEnabled={auth?.user?.role === Roles.MANAGER}
                        withActions={auth?.user?.role === Roles.MANAGER}
                    ></MatTable>
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={productsTableMap.get(command)}
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
