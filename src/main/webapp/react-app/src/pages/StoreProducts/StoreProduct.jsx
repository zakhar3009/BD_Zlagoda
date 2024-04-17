import React, {useEffect, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandName.js";

export default function StoreProduct({command}) {
    const [storeProducts, setStoreProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStoreProductsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                })
            );
            const data = await response.json();
            setStoreProducts(data);
            setIsLoading(false);
            console.log(data);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchStoreProductsData();
    }, [command]);

    const deleteStoreProduct = async (productId) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_PRODUCT_IN_SHOP",
            },
            body: JSON.stringify({
                UPC: productId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const data = await response.json();
            fetchStoreProductsData();
            console.log(data);
            toast.success("Product in shop was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return (
        <main className="px-8 py-4">
            <div className="grid">
                {!isLoading && (
                    <MatTable
                        columnNames={storeProductsTableMap.get(command)}
                        rows={storeProducts}
                        deleteFunc={deleteStoreProduct}
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_product"}
                    ></MatTable>
                )}
            </div>
        </main>
    );
}
