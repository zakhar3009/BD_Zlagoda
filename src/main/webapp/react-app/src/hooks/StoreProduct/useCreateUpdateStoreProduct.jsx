import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCreateUpdateStoreProduct(id, storeProduct) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    useEffect(() => {
        setValue("UPC", storeProduct.UPC)
        setValue("sellingPrice", storeProduct.sellingPrice);
        setValue("productsNumber", storeProduct.productsNumber);
        setValue("promotionalProduct", storeProduct.promotionalProduct);
        setValue("promStoreProduct", storeProduct.promStoreProduct);
        setValue("product", storeProduct.product);
    }, [storeProduct, setValue]);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_PRODUCTS",
                })
            );
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);


    const addEditStoreProductRequest = async (command) => {
        const formData = getValues();
        console.log("FORM DATA:", formData)
        const product = products.find((item) => (item.id === Number(formData.product)));
        const newStoreProduct = {
            ...formData,
            sellingPrice: Number(formData.sellingPrice),
            productsNumber: Number(formData.productsNumber),
            product: product ? product : storeProduct.product
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: command,
            },
            body: JSON.stringify(newStoreProduct),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const data = await response.json();
            if (id) toast.success("Store storeProduct was updated");
            else toast.success("New store storeProduct was added");
        } catch (err) {
            toast.error(`Error: ${err}`);
        } finally {
            if(id) navigate("../get_all_products_in_shop_order_by_quantity");
            else navigate("/store-products/get_all_products_in_shop_order_by_quantity")
        }
    };

    const onSubmit = () => {
        if (id) addEditStoreProductRequest("POST_UPDATE_PRODUCT_IN_SHOP");
        else addEditStoreProductRequest("POST_ADD_PRODUCT_IN_SHOP");
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        products: products,
    };
}
