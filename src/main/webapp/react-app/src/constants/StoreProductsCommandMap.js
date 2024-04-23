import {Roles} from "@/constants/auth/allowedRoles.js";

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
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME", simpleStoreProductCols],
    ["GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", simpleStoreProductCols],
    ["PROM_PRODUCT_COLUMNS", promProductCols],
    ["ALL_STORE_PRODUCTS_COLUMNS", simpleStoreProductCols],
    ["GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", simpleStoreProductCols],
    ["GET_PROM_PRODUCTS_ORDER_BY_NAME", simpleStoreProductCols],
    ["GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", simpleStoreProductCols],
    ["GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", simpleStoreProductCols]
]);
// export const storeProductsCommandMap = new Map([
//     ["GET_ALL_PRODUCTS_IN_SHOP", "Store Products"],
//     ["POST_ADD_PRODUCT_IN_SHOP", "Add new store product"],
// ]);
export const storeProductsCommands = [
    {
        path: "get_all_products_in_shop_order_by_quantity",
        title: "Get all store products order by quantity",
        allowedRoles: [Roles.MANAGER]
    },
    {
        path: "get_all_products_in_shop_order_by_name",
        title: "Get all store products order by name",
        allowedRoles: [Roles.CASHIER]
    },
    {
        path: "get_prom_products_order_by_name",
        title: "Get all prom products order by name",
        allowedRoles: [Roles.MANAGER, Roles.CASHIER]
    },
    {
        path: "get_prom_products_order_by_quantity",
        title: "Get all prom products order by quantity",
        allowedRoles: [Roles.MANAGER, Roles.CASHIER]
    },
    {
        path: "get_non_prom_products_order_by_name",
        title: "Get all non prom products order by name",
        allowedRoles: [Roles.MANAGER, Roles.CASHIER]
    },
    {
        path: "get_non_prom_products_order_by_quantity",
        title: "Get all non prom products order by quantity",
        allowedRoles: [Roles.MANAGER, Roles.CASHIER]
    }
]