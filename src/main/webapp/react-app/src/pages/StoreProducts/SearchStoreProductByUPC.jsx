import React, {useRef, useState} from "react";
import {toast} from "react-toastify";
import NewMatTable from "@/components/table/NewMatTable.jsx";
import {storeProductsTableMap, storeProductTablePrintMap} from "@/constants/StoreProductsCommandMap.js";
import EditStoreProductDiscountModal from "@/components/modals/EditStoreProductDiscountModal.jsx";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {useReactToPrint} from "react-to-print";
import {useNavigate} from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";

export default function SearchStoreProductByUPC() {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState(null);
    const [selectedStoreProduct, setSelectedProduct] = useState({});

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const fetchProductData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "SEARCH_STORE_PRODUCTS_PART_OF_UPC",
                    query: query,
                })
            );
            const getProduct = await response.json()
            setProducts(getProduct.map(
                (item) => ({
                    UPC: item.UPC,
                    name: item.product.name,
                    category_name: item.product.category.name,
                    characteristic: item.product.characteristic,
                    productsNumber: item.productsNumber,
                    sellingPrice: item.sellingPrice,
                })));
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const onDeleteStoreProduct = (item) => {
        if (item.promotionalProduct) deleteStoreProduct("DELETE_PROM_STORE_PRODUCT", item.UPC)
        else deleteStoreProduct("DELETE_PRODUCT_IN_SHOP", item.UPC)
    }

    const onCloseEditModal = () => {
        setSelectedProduct({});
        setIsEditModalOpen(false);
    }

    const onDiscountStoreProduct = (item) => {
        if (!item.promotionalProduct) {
            setSelectedProduct(item);
            setIsEditModalOpen(true);
        }
    }

    const onEditStoreProduct = (item) => {
        navigate("../" + item.UPC + "/post_update_product_in_shop");
    }

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
            await response.json();
            fetchProductData();
            if (command === "DELETE_PRODUCT_IN_SHOP")
                toast.success("Product in shop was removed!")
            else toast.success("Prom product in shop was removed!")
        } catch (err) {
            toast.error("Cannot be deleted, due to database integrity!")
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchProductData();
    };

    let columns = [];

    if(auth?.user?.role === Roles.CASHIER)
        columns = [
            "UPC",
            "sellingPrice",
            "productsNumber",
        ]
    else
        columns = [
            "UPC",
            "name",
            "category_name",
            "characteristic",
            "sellingPrice",
            "productsNumber",
        ]

    return (
        <div className="pb-3">
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
                <>
                    <NewMatTable
                        columnNames={columns}
                        rows={products}
                        onDeleteClick={onDeleteStoreProduct}
                        onDiscountClick={onDiscountStoreProduct}
                        onEditClick={onEditStoreProduct}
                        discountEnabled={auth?.user?.role === "MANAGER"}
                        editEnabled={auth?.user?.role === "MANAGER"}
                        deleteEnabled={auth?.user?.role === "MANAGER"}
                        withActions={auth?.user?.role === "MANAGER"}
                    />
                    {isEditModalOpen &&
                        <EditStoreProductDiscountModal
                            open={isEditModalOpen}
                            selectedStoreProduct={selectedStoreProduct}
                            handleClose={onCloseEditModal}
                        />
                    }
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={storeProductTablePrintMap}
                            rows={products}
                        />
                    </div>
                    <div className="flex justify-content-end mt-2">
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handlePrint}>To PDF
                        </button>
                    </div>
                </>
            }
        </div>
    )
}