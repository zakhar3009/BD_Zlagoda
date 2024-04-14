import React, {useEffect, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import Combobox from "@/components/comboboxes/Combobox.jsx";
import {toast} from "react-toastify";
import {productsTableMap} from "@/constants/ProductsCommandName.js";

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

    // useEffect(() => {
    //     fetchAllCategories();
    // }, []);

    // delete

    const getAllProductsByCategory = async (name) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME",
                    category_name: "Clothing"
                })
            );
            const products = await response.json();
            console.log(categories);
            setProducts(products);
            console.log(products)
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const onChangeSelectedCategory = (value) => setSelectedCategory(value)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(selectedCategory)
        getAllProductsByCategory('sd');
    };

    return (
        <main className="px-8 py-4">
            <div className="grid">
                <form
                    onSubmit={handleFormSubmit}
                    className="grid sm:grid-cols-2 gap-3 mb-4"
                >
                    <select
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="block pl-3 w-full md:place-self-end sm:max-w-80 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_employee"}
                    ></MatTable>
                )}
            </div>
        </main>
    );
}
