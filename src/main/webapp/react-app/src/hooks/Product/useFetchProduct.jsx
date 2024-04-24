import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const defaultProduct = {
    id: "",
    name: "",
    characteristic: "",
    category: ""
};

export default function useFetchProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(defaultProduct);

    const getProductByID = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_PRODUCT_BY_ID",
                    id_product: id,
                })
            );
            const productID = await response.json();
            setProduct(productID);
        } catch (err) {
            toast.error(`Error: ${err}`);
            navigate("../get_all_products");
        }
    };

    useEffect(() => {
        if (id) getProductByID();
        else setProduct(defaultProduct);
    }, [id]);

    return {
        id,
        product
    }
}
