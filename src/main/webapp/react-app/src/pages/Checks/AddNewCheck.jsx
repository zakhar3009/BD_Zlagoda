import EnhancedTable from "@/components/table/AddNewCheckTable.jsx";
import Card from "./../../components/cards/Card.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


export default function AddNewCheck() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const fetchStoreProductsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_PRODUCTS_IN_SHOP",
                })
            );
            let data = await response.json();
            let newData = data
                .filter((item) => (item.productsNumber !== 0))
                .map((item) => ({
                    id: item.UPC,
                    UPC: item.UPC,
                    name: item.product.name,
                    productsNumber: item.productsNumber,
                    sellingPrice: item.sellingPrice,
                }))
            setProducts(newData);
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchStoreProductsData();
    }, []);

    console.log(products)
    return (

        <Card height={"screen"}>
            {!isLoading &&
                <EnhancedTable
                    rows={products}

                />}
        </Card>

    )
}