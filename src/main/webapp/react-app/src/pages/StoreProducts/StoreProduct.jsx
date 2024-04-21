import React, {useState} from "react";
import useStoreProducts from "@/hooks/StoreProduct/useStoreProducts.jsx";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandMap.js";
import NewMatTable from "@/components/table/NewMatTable.jsx";
import {useNavigate} from "react-router-dom";
import EditStoreProductDiscountModal from "@/components/modals/EditStoreProductDiscountModal.jsx";

export default function StoreProduct({command}) {
    const navigate = useNavigate();
    const [selectedStoreProduct, setSelectedProduct] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const {
        storeProducts,
        isLoading,
        deleteStoreProduct,
    } = useStoreProducts(command);

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

    return (
        <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="grid">
                {!isLoading &&
                    <>
                        <NewMatTable
                            columnNames={storeProductsTableMap.get(command)}
                            rows={storeProducts}
                            onDeleteClick={onDeleteStoreProduct}
                            onDiscountClick={onDiscountStoreProduct}
                            onEditClick={onEditStoreProduct}
                        />
                        {isEditModalOpen &&
                            <EditStoreProductDiscountModal
                                open={isEditModalOpen}
                                selectedStoreProduct={selectedStoreProduct}
                                handleClose={onCloseEditModal}
                            />
                        }
                    </>
                }
            </div>
        </main>
    );
}
