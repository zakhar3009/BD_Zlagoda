import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCreateUpdateProduct(id, product) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    useEffect(() => {
        setValue("name", product.name);
        setValue("characteristic", product.characteristic);
        setValue("category", product.category.number ? product.category.number : product.category);
    }, [product, setValue]);

    const fetchAllCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_CATEGORIES",
                })
            );
            const data = await response.json();
            setCategories(data.map((item) => ({label: item.name, value: item.number})))
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);


    const addEditProductRequest = async (command) => {
        const formData = getValues();
        const category = categories.find((item) => (item.value === Number(formData.category)));
        const newProduct = {
            id: id,
            ...formData,
            "category": {
                number: category.value,
                name: category.label
            },
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: command,
            },
            body: JSON.stringify(newProduct),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            if (id) toast.success("Product was updated");
            else toast.success("New product was added");
        } catch (err) {
            toast.error(`Error: ${err}`);
        } finally {
            navigate("../get_all_products_order_by_name");
        }
    };

    const onSubmit = () => {
        if (id) addEditProductRequest("POST_UPDATE_PRODUCT");
        else addEditProductRequest("POST_ADD_PRODUCT");
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        categories,
        getValues
    };
}
