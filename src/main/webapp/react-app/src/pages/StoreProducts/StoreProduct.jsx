import React, {useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import useStoreProducts from "@/hooks/StoreProduct/useStoreProducts.jsx";
import {productsTableMap} from "@/constants/ProductsCommandMap.js";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandMap.js";
import NewMatTable from "@/components/table/NewMatTable.jsx";

export default function StoreProduct({command}) {

    const {
        storeProducts,
        isLoading,
        deleteStoreProduct,
        createPromStoreProduct
    } = useStoreProducts(command);

    const onDeleteStoreProduct = (item) => {
        if(item.promotionalProduct) deleteStoreProduct("DELETE_PROM_STORE_PRODUCT", item.UPC)
        else deleteStoreProduct("DELETE_PRODUCT_IN_SHOP", item.UPC)
    }

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading &&
                    <NewMatTable
                        columnNames={storeProductsTableMap.get(command)}
                        rows={storeProducts}
                        onDeleteClick={onDeleteStoreProduct}
                        onDiscountClick
                        onEditClick
                    />
                }
            </div>
        </main>
    );
}
