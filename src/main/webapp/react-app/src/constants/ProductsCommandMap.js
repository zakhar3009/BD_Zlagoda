const columnsName =
    [   "id",
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
    ["GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", columnsName],
    ["GET_PROM_PRODUCTS_ORDER_BY_NAME", columnsName],
    ["GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", columnsName],
    ["GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", columnsName]
]);
// export const productsCommandMap = new Map([
//     ["GET_ALL_PRODUCTS", "Products"],
//     ["POST_ADD_PRODUCT", "Add new product"],
// ]);

// export const productsCommands = {
//     "get_all_products": {
//         title: "Get all products",
//         allowedRoles: []
//     }
// };
