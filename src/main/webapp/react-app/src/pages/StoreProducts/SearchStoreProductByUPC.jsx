import React, {useState} from "react";
import {toast} from "react-toastify";
import Card from "@/components/cards/Card.jsx";

export default function SearchStoreProductByUPC() {
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [product, setProduct] = useState({});


    const deleteStoreProduct = async (command, productUPC) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: command,
            },
            body: JSON.stringify({
                UPC: productUPC,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const data = await response.json();
            fetchStoreProductsData();
            if (command === "DELETE_PRODUCT_IN_SHOP")
                toast.success("Product in shop was removed!")
            else toast.success("Prom product in shop was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!")
        }
    };
    const onEditStoreProduct = (item) => {
        navigate("../" + item.UPC + "/post_update_product_in_shop");
    }

    const fetchProductData = async () => {
        try {
            setIsLoading(true);
            console.log("GET_PRODUCT_BY_UPC");
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_PRODUCT_BY_UPC",
                    UPC: query,
                })
            );
            const getProduct = await response.json();
            setProduct(getProduct);
            setIsLoading(false);
            console.log(product);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchProductData();
    };

    return (
        <main className="px-8 py-2 h-screen bg-gradient-to-r from-violet-200 to-pink-200">

            <div className="mb-6">
                <form
                    onSubmit={handleFormSubmit}
                    className="grid sm:grid-cols-2 gap-3 mb-4"
                >
                    <input
                        id="default-input"
                        placeholder="UPC.."
                        type="text"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                        className="bg-gray-50 md:place-self-end sm:max-w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <button
                        type="submit"
                        className="text-white md:max-w-64 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Search
                    </button>
                </form>
                {!isLoading &&
                    <Card height="screen" maxW="max-w-3xl">
                        {product &&
                            <>
                                <div className="flex justify-center">
                                    <label className="font-mono text-lg font-bold text-justify">Product by UPC '{query}'
                                        :</label>
                                </div>

                                <div className="p-3">
                                    <div>
                                        <label className="font-mono  text-justify m-2">Name: </label>
                                        <label className="font-mono  text-justify">{product.product.name}</label>
                                    </div>
                                    <div>
                                        <label className="font-mono  text-justify m-2">Selling price: </label>
                                        <label className="font-mono  text-justify">{product.sellingPrice}</label>
                                    </div>
                                    <div>
                                        <label className="font-mono  text-justify m-2">Products number: </label>
                                        <label className="font-mono  text-justify ">{product.productsNumber}</label>
                                    </div>
                                    <div>
                                        <label className="font-mono  text-justify m-2">Characteristic: </label>
                                        <label
                                            className="font-mono  text-justify">{product.product.characteristic}</label>
                                    </div>
                                </div>
                            </>
                        }
                        {!product &&
                            <div className="flex justify-center">
                            <label className="font-mono text-lg font-bold text-justify">Product by UPC '{query}' doesn't exist!</label>
                        </div>
                        }
                    </Card>
                }

            </div>
        </main>
    )
}