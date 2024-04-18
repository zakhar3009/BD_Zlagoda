import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const defaultProduct = {
    UPC: "",
    storeProduct: "",
    product: "",
    sellingPrice: 0.0,
    productsNumber: 0,
    promotionalProduct: false
};

export default function useFetchStoreProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(defaultProduct);

    const getProductByID = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_PRODUCT_BY_UPC",
                    id_product: id,
                })
            );
            const productID = await response.json();
            setProduct(productID);
            console.log(productID)
        } catch (err) {
            toast.error(`Error: ${err}`);
            navigate("../get_all_products_in_shop");
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
