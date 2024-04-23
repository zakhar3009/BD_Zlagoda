import React, {useEffect, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import Combobox from "@/components/comboboxes/Combobox.jsx";
import {toast} from "react-toastify";
import {productsTableMap} from "@/constants/ProductsCommandMap.js";

export default function ProductsByCategoryOrderByName() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    // Get all categories for dropdown
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


    const getAllProductsByCategory = async (name) => {
        if(!name) setProducts([])
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME",
                    category_name: name
                })
            );
            const products = await response.json();
            let filteredProduct =[];
            products.map((item) =>{
                const filteredItem ={
                    category_number: item.category_number,
                    category_name: item.category.name,
                    id: item.id,
                    name: item.name,
                    characteristic: item.characteristic
                };
                filteredProduct.add(filteredItem);

            })
            setIsLoading(false);
            console.log(filteredProduct)
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };



    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(selectedCategory);
        getAllProductsByCategory(selectedCategory);
    };

    const deleteProduct = async (productId) => {
        console.log("deleting PRODUCT");
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_PRODUCT",
            },
            body: JSON.stringify({
                id_product: productId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const data = await response.json();
            getAllProductsByCategory(selectedCategory);
            console.log(data);
            toast.success("Product was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                <form
                    onSubmit={handleFormSubmit}
                    className="grid sm:grid-cols-2 gap-3 mb-4"
                >
                    <select
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="block h-full pl-3 w-full md:place-self-end sm:max-w-80 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value={null}></option>
                        {categories.map((item) => (
                            <option key={item.value} value={item.label}>{item.label}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="text-white md:max-w-64 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Search
                    </button>
                </form>
                {!isLoading && (
                    <MatTable
                        columnNames={productsTableMap.get("GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME")}
                        rows={products}
                        deleteFunc={deleteProduct}
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_product"}
                    ></MatTable>
                )}
            </div>
        </main>
    );
}
