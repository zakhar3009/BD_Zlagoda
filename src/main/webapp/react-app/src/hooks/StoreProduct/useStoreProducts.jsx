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
                    promotionalProduct: item.promotionalProduct === "True",
                    sellingPrice: item.sellingPrice,
                })));
            setIsLoading(false);
            console.log("StoreProducts: ", data.map(
                (item) => ({
                    UPC: item.UPC,
                    UPC_prom: item.promStoreProduct?.UPC ? item.promStoreProduct.UPC : "",
                    name: item.product.name,
                    category_name: item.product.category.name,
                    productsNumber : item.productsNumber,
                    promotionalProduct: item.promotionalProduct === "True",
                    sellingPrice: item.sellingPrice,
                })));
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchStoreProductsData();
    }, [command]);

    const deleteStoreProduct = async (productUPC) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_PRODUCT_IN_SHOP",
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
            console.log(data);
            toast.success("Product in shop was removed!")
        } catch (err) {
            console.log(err)
            toast.error(`ERROR: ${err}`)
        }
    };

    const deletePromStoreProduct = async (productUPC) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_PROM_STORE_PRODUCT",
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
            console.log(data);
            toast.success("Promotional was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const createPromStoreProduct = async (productUPC) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: "POST_ADD_PROM_PRODUCT_IN_SHOP",
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
            console.log(data);
            toast.success("Promotional was created!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };


    return {
        storeProducts,
        isLoading,
        fetchStoreProductsData,
        deleteStoreProduct,
        deletePromStoreProduct,
        createPromStoreProduct
    }
}