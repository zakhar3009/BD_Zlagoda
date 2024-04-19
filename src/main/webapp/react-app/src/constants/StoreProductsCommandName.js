const columnsName =
    ["name",
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

const simpleStoreProductCols = ["UPC", "name", "category_name", "productsNumber", "promotionalProduct", "sellingPrice", "actions"]
export const storeProductsTableMap = new Map([
    ["GET_ALL_PRODUCTS_IN_SHOP", columnsName],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", columnsName],
    ["PROM_PRODUCT_COLUMNS", promProductCols],
    ["SIMPLE_STORE_PRODUCT_COLUMNS", simpleStoreProductCols]
]);
export const storeProductsCommandMap = new Map([
    ["GET_ALL_PRODUCTS_IN_SHOP", "Get all products in shop"],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", "Get all store products order by quantity"],
    ["POST_ADD_PRODUCT_IN_SHOP", "Add new store product"],
    ["POST_UPDATE_PRODUCT_IN_SHOP", "Update store product"],
    ["DELETE_PRODUCT_IN_SHOP", "Delete product in shop"],
]);