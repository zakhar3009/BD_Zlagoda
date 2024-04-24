import {useState} from "react";
import {toast} from "react-toastify";
import MatTable from "@/components/table/MatTable.jsx";
import {productsTableMap} from "@/constants/ProductsCommandMap.js";

export default function SearchProductsByPartOfName() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchProductsData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "SEARCH_PRODUCT_BY_PART_OF_NAME",
                    query: query,
                })
            );
            const getProductsByName = await response.json();
            setProducts(getProductsByName.map(
                (item) => ({
                    id: item.id,
                    name: item.name,
                    characteristic: item.characteristic,
                    category_number: item.category.number,
                    category_name: item.category.name
                })
            ));
            setLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchProductsData();
    };

    return (
        <div className="mb-6">
            <form
                onSubmit={handleFormSubmit}
                className="grid sm:grid-cols-2 gap-3 mb-4"
            >
                <input
                    id="default-input"
                    placeholder="Name of product"
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
            {!isLoading && (
                <MatTable
                    columnNames={productsTableMap.get("GET_ALL_PRODUCTS")}
                    rows={products}
                ></MatTable>
            )}
        </div>
    );
}