import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCreateUpdateCategory(id, category) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    useEffect(() => {
        setValue("name", category.name);
    }, [category, setValue]);

    // Toast needed
    const addEditCategoryRequest = async (command) => {
        const formData = getValues();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: command,
            },
            body: JSON.stringify(formData),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const data = await response.json();
            if (id) toast.success("Category was updated");
            else toast.success("New category was added");
        } catch (err) {
            toast.error(`Error: ${err}`);
        } finally {
            navigate("../get_all_categories");
        }
    };

    const onSubmit = () => {
        if (id) addEditCategoryRequest("POST_UPDATE_CATEGORY");
        else addEditCategoryRequest("POST_ADD_CATEGORY");
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
    };
}
