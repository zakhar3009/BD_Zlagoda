const columnsName =
    ["id",
        "name",
        "category_number",
        "category_name",
        "characteristic",
    ];
export const productsTableMap = new Map([
    ["GET_ALL_PRODUCTS", columnsName],
    ["GET_ALL_PRODUCTS_ORDER_BY_NAME", columnsName],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", columnsName],
    ["GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME", columnsName],
    ["GET_PRODUCT_BY_UPC", columnsName],
]);
export const productsCommandMap = new Map([
    ["GET_ALL_PRODUCTS", "Get all products"],
    ["GET_ALL_PRODUCTS_ORDER_BY_NAME", "Get all products order by name"],
    // ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", "Get all products in shop order by quantity"],
    ["GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME", "Get products by category order by name"],
    // ["GET_PRODUCT_BY_UPC", "Get product by UPC"],
    ["POST_ADD_PRODUCT", "Add new product"],
    ["POST_UPDATE_PRODUCT", "Update product"],
    ["DELETE_PRODUCT", "Delete product"],
]);