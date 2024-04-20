import React, {useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import useStoreProducts from "@/hooks/StoreProduct/useStoreProducts.jsx";
import {productsTableMap} from "@/constants/ProductsCommandMap.js";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandMap.js";

export default function StoreProduct({command}) {
    const [data, setData] = useState(null);

    const {
        storeProducts,
        isLoading,
        deleteStoreProduct,
        deletePromStoreProduct,
        createPromStoreProduct
    } = useStoreProducts(command);

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading &&
                    <MatTable>
                        columnNames={storeProductsTableMap.get(command)}
                        rows={data}
                        deleteFunc={deleteProduct}
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_product"}
                    </MatTable>
                }
            </div>
        </main>
    );
}
