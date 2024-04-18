import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCreateUpdateStoreProduct(id, product) {
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
        setValue("sellingPrice", product.sellingPrice);
        setValue("productsNumber", product.productsNumber);
        setValue("promotionalProduct", product.promotionalProduct);
        setValue("product", product.product);
    }, [product, setValue]);

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
            console.log(data)
          //  setProducts(data.map((item) => ({label: item.name, value: item.id})))
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);


    const addEditStoreProductRequest = async (command) => {
        const formData = getValues();
        console.log(products)
        console.log(formData)
        const product = products.find((item) => (item.id === Number(formData.product)));
        const newStoreProduct = {
            UPC: id,
            ...formData,
            "product": product
        }
        console.log(newStoreProduct)
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
            if (id) toast.success("Store product was updated");
            else toast.success("New store product was added");
        } catch (err) {
            toast.error(`Error: ${err}`);
        } finally {
            navigate("../get_all_products_in_shop");
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
