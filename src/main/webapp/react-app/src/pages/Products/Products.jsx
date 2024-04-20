import React, {useEffect, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {productsTableMap} from "../../constants/ProductsCommandMap.js";

export default function Products({command, properties}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            console.log(data);
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
            const data = await response.json();
            fetchProductsData();
            console.log(data);
            toast.success("Product was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading && (
                    <MatTable
                        columnNames={productsTableMap.get(command)}
                        rows={data}
                        deleteFunc={deleteProduct}
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_product"}
                    ></MatTable>
                )}
            </div>
        </main>
    );
}
