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
    ["GET_ALL_CLIENTS", [columnNames]],
    ["GET_ALL_CLIENTS_ORDER_BY_SURNAME", [columnNames]],

    ])