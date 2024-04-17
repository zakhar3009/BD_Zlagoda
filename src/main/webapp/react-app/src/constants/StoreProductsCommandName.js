const columnsName =
    ["id",
        "name",
        "category_number",
        "category_name",
        "characteristic",
    ];
export const storeProductsTableMap = new Map([
    ["GET_ALL_PRODUCTS_IN_SHOP", columnsName],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", columnsName],
]);
export const storeProductsCommandMap = new Map([
    ["GET_ALL_PRODUCTS_IN_SHOP", "Get all products in shop"],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", "Get all products order by quantity"],
    ["POST_ADD_PRODUCT_IN_SHOP", "Add new store product"],
    ["POST_UPDATE_PRODUCT_IN_SHOP", "Update store product"],
    ["DELETE_PRODUCT_IN_SHOP", "Delete product in shop"],
]);