import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const defaultClient = {
    number: "",
    customerSurname: "",
    customerName: "",
    customerPatronymic: "",
    phoneNumber: "",
    city: "",
    street: "",
    zipCode: "",
    percent: 0
};

export default function useFetchCustomerCard() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [client, setClient] = useState(defaultClient);

    const getClientById = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_CLIENT_BY_ID",
                    card_number: id,
                })
            );
            const client = await response.json();
            setClient(client);
        } catch (err) {
            toast.error(`Error: ${err}`);
            navigate("../get_all_clients");
        }
    };

    useEffect(() => {
        if (id) getClientById();
        else setClient(defaultClient)
    }, [id]);

    return {
        id,
        client
    }
}
