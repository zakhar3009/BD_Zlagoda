import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const defaultCategory = {
    id: "",
    name: ""
};

export default function useFetchCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState(defaultCategory);

    console.log(id)

    const getCategoryByID = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_CATEGORY_BY_ID",
                    category_number: id,
                })
            );
            const categoryID = await response.json();
            console.log(categoryID);
            setCategory(categoryID);
        } catch (err) {
            toast.error(`Error: ${err}`);
            navigate("../get_all_categories");
        }
    };

    useEffect(() => {
        if (id) getCategoryByID();
        else setCategory(defaultCategory);
    }, [id]);

    return {
        id,
        category
    }
}
