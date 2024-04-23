import React, {useRef, useState} from "react";
import useStoreProducts from "@/hooks/StoreProduct/useStoreProducts.jsx";
import {storeProductsTableMap, storeProductTablePrintMap} from "@/constants/StoreProductsCommandMap.js";
import NewMatTable from "@/components/table/NewMatTable.jsx";
import {useNavigate} from "react-router-dom";
import EditStoreProductDiscountModal from "@/components/modals/EditStoreProductDiscountModal.jsx";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {useReactToPrint} from "react-to-print";
import useAuth from "@/hooks/auth/useAuth.js";

export default function StoreProduct({command}) {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [selectedStoreProduct, setSelectedProduct] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
        <div className="grid">
            {!isLoading &&
                <>
                    <NewMatTable
                        columnNames={storeProductsTableMap.get(command)}
                        rows={storeProducts}
                        onDeleteClick={onDeleteStoreProduct}
                        onDiscountClick={onDiscountStoreProduct}
                        onEditClick={onEditStoreProduct}
                        discountEnabled={auth?.user?.role === "MANAGER"}
                        editEnabled={auth?.user?.role === "MANAGER"}
                        deleteEnabled={auth?.user?.role === "MANAGER"}
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
                            rows={storeProducts}
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
    );
}
