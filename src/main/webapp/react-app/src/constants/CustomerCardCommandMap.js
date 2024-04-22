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
export const customerCardTableMap = new Map([
    ["GET_ALL_CLIENTS", columnNames],
    ["GET_ALL_CLIENTS_ORDER_BY_SURNAME", columnNames],
    ["GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME", columnNames],
    ["GET_CLIENTS_BY_PART_OF_SURNAME", columnNames]
    ]);
export const customerCardMap = new Map([
    ["GET_ALL_CLIENTS", "Clients"],
    // ["GET_ALL_CLIENTS_ORDER_BY_SURNAME", "Get all clients order by surname"],
    // ["GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME", "Get clients by percent order by surname"],
    // ["GET_CLIENTS_BY_PART_OF_SURNAME", "Search clients by part of surname"],
    ["POST_ADD_CLIENT", "Add new customer"],
    // ["POST_UPDATE_CLIENT", "Update customer"],
    // ["DELETE_CLIENT", "Delete customer"]
])