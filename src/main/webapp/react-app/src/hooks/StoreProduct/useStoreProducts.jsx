import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function useStoreProducts(command) {
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
            setStoreProducts(data.map(
                (item) => ({
                    UPC: item.UPC,
                    UPC_prom: item.promStoreProduct?.UPC ? item.promStoreProduct.UPC : "",
                    name: item.product.name,
                    category_name: item.product.category.name,
                    productsNumber : item.productsNumber,
                    promotionalProduct: item.promotionalProduct,
                    sellingPrice: item.sellingPrice,
                })));
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchStoreProductsData();
    }, [command]);

    const deleteStoreProduct = async (command, productUPC) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: command,
            },
            body: JSON.stringify({
                UPC: productUPC,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const data = await response.json();
            fetchStoreProductsData();
            if (command === "DELETE_PRODUCT_IN_SHOP")
                toast.success("Product in shop was removed!")
            else toast.success("Prom product in shop was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!")
        }
    };


    return {
        storeProducts,
        isLoading,
        fetchStoreProductsData,
        deleteStoreProduct,
    }
}