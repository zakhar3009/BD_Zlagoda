import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCreateUpdateCustomerCard(id, client) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    useEffect(() => {
        setValue("number", client.number);
        setValue("customerSurname", client.customerSurname);
        setValue("customerName", client.customerName);
        setValue("customerPatronymic", client.customerPatronymic);
        setValue("phoneNumber", client.phoneNumber);
        setValue("city", client.city);
        setValue("street", client.street);
        setValue("zipCode", client.zipCode);
        setValue("percent", client.percent)
    }, [client, setValue]);

    const addEditClientRequest = async (command) => {
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
            if (id) toast.success("Client was updated");
            else toast.success("New client was added");
        } catch (err) {
            toast.error(`Error: ${err}`);
        } finally {
            navigate("../get_all_clients");
        }
    };

    const onSubmit = () => {
        if (id) addEditClientRequest("POST_UPDATE_CLIENT");
        else addEditClientRequest("POST_ADD_CLIENT");
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
    };
}
