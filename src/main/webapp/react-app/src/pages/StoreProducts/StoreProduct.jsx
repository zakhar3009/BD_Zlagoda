import React, {useEffect, useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandName.js";
import CollapsibleTable from "@/components/table/CollapsibleTable.jsx";
import useStoreProducts from "@/hooks/StoreProduct/useStoreProducts.jsx";

export default function StoreProduct({command}) {
    const {
        storeProducts,
        isLoading,
        fetchStoreProductsData,
        deleteStoreProduct,
        deletePromStoreProduct,
        createPromStoreProduct
    } = useStoreProducts(command);

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading && (
                    <CollapsibleTable
                        columnNames={storeProductsTableMap.get("SIMPLE_STORE_PRODUCT_COLUMNS")}
                        rows={storeProducts}
                        deleteStoreProduct={deleteStoreProduct}
                        deletePromStoreProduct={deletePromStoreProduct}
                        createPromStoreProduct={createPromStoreProduct}
                    >
                    </CollapsibleTable>
                )}
            </div>
        </main>
    );
}
