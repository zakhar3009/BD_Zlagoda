import React, {useEffect, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandName.js";
import CollapsibleTable from "@/components/table/CollapsibleTable.jsx";

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
            let data = await response.json();

            const filteredData = data;
            data.forEach((item) => {
                if(item.promStoreProduct) {
                    let upc = item.promStoreProduct.UPC;
                    let idxToRemove = data.findIndex((item) =>
                        (upc === item.UPC));
                    console.log(idxToRemove);
                    filteredData.splice(idxToRemove, 1);
                }
            })
            setStoreProducts(filteredData.map(
                (item) => ({
                    UPC: item.UPC,
                    // id: item.product.id,
                    name: item.product.name,
                    // characteristic: item.product.characteristic,
                    // category_number: item.product.category.number,
                    category_name: item.product.category.name,
                    productsNumber : item.productsNumber,
                    promotionalProduct: item.promotionalProduct ? "True" : "False",
                    sellingPrice: item.sellingPrice,
                    promStoreProduct: item.promStoreProduct,
                })
            ));
            setIsLoading(false);
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
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading && (
                    <CollapsibleTable
                        columnNames={["UPC", "name", "category_name", "productsNumber", "promotionalProduct", "sellingPrice"]}
                        rows={storeProducts}>
                    </CollapsibleTable>
                )}
            </div>
        </main>
    );
}
