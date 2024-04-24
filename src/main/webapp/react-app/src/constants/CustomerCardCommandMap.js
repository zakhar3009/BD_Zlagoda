import {Roles} from "@/constants/auth/allowedRoles.js";

const columnNames =
    [
        "number",
        "customerSurname",
        "customerName",
        "customerPatronymic",
        "phoneNumber",
        "city",
        "street",
        "zipCode",
        "percent"
    ]
const columnNamesForCheckedOutByCashier =
    [
        ""
    ]
export const customerCardTableMap = new Map([
    ["GET_ALL_CLIENTS", columnNames],
    ["GET_ALL_CLIENTS_ORDER_BY_SURNAME", columnNames],
    ["GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME", columnNames],
    ["GET_CLIENTS_BY_PART_OF_SURNAME", columnNames],
    ["GET_CUSTOMER_CARDS_CHECKED_OUT_BY_CASHIERS", columnNamesForCheckedOutByCashier ]
    ]);

export const customerCardCommands = [
    {
        path: "get_all_clients",
        title: "Get all clients",
        allowedRoles: [Roles.CASHIER, Roles.MANAGER]
    },
    {
        path: "get_all_clients_order_by_surname",
        title: "Get all clients order by surname",
        allowedRoles: [Roles.CASHIER, Roles.MANAGER]
    },
    {
        path: "get_clients_by_percent_order_by_surname",
        title: "Get clients by percent order by surname",
        allowedRoles: [Roles.MANAGER]
    },
    {
        path: "get_clients_by_part_of_surname",
        title: "Search clients by part of surname",
        allowedRoles: [Roles.CASHIER, Roles.MANAGER]
    },
    {
        path: "get_customer_cards_checked_out_by_cashiers",
        title: "Get customer cards checked out by cashier",
        allowedRoles: [Roles.MANAGER]
    },
    {
        path: "post_add_client",
        title: "Add new Client",
        allowedRoles: [Roles.CASHIER, Roles.MANAGER]
    },
    {
        path: "post_update_client",
        title: "Update a client",
        allowedRoles: [Roles.CASHIER, Roles.MANAGER]
    }
]