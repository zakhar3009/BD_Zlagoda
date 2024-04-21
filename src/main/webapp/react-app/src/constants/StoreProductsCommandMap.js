const columnsName =
    [   "name",
        "UPC",
        "id",
        "category_number",
        "category_name",
        "characteristic",
        "productsNumber",
        "promotionalProduct",
        "sellingPrice"
    ];

const promProductCols =
    [
        "UPC",
        "product_id",
        "category_number",
        "characteristic",
        "sellingPrice",
        "productsNumber",
        "actions"
    ];

export const storeProductTablePrintMap = ["UPC", "UPC_prom", "name", "category_name", "productsNumber", "promotionalProduct", "sellingPrice"]
const simpleStoreProductCols = ["UPC", "UPC_prom", "name", "category_name", "productsNumber", "promotionalProduct", "sellingPrice", "actions"]
export const storeProductsTableMap = new Map([
    ["GET_ALL_PRODUCTS_IN_SHOP", simpleStoreProductCols],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", simpleStoreProductCols],
    ["PROM_PRODUCT_COLUMNS", promProductCols],
    ["ALL_STORE_PRODUCTS_COLUMNS", simpleStoreProductCols],
    ["GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", simpleStoreProductCols],
    ["GET_PROM_PRODUCTS_ORDER_BY_NAME", simpleStoreProductCols],
    ["GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", simpleStoreProductCols],
    ["GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", simpleStoreProductCols]
]);
export const storeProductsCommandMap = new Map([
    ["GET_ALL_PRODUCTS_IN_SHOP", "Store Products"],
    // ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", "Get all store products order by quantity"],
    ["POST_ADD_PRODUCT_IN_SHOP", "Add new store product"],
    ["POST_UPDATE_PRODUCT_IN_SHOP", "Update store product"],
    ["DELETE_PRODUCT_IN_SHOP", "Delete product in shop"],
]);