const columnsName =
    [
        "number",
        "employee",
        "customerCard",
        "printDate",
        "sumTotal",
        "vat",
    ];

export const checksTableMap = new Map([
    ["GET_ALL_CHECKS", columnsName],
    ["GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD", columnsName],
    ["GET_ALL_CHECKS_BY_TIME_PERIOD", columnsName],
    ["GET_SELF_DAILY_CHECKS", columnsName],
    ["GER_SELF_CHECKS_PER_PERIOD", columnsName],
    ["GET_ALL_CHECKS_BY_CASHIER", columnsName]
]);
export const checksCommandMap = new Map([
    // ["GET_CHECK_BY_NUMBER", "Get check by id"],
    // manager commands
    ["GET_ALL_CHECKS", "Checks"],
    // ["GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD", "Get checks by specific cashier per period"],
    // ["GET_ALL_CHECKS_BY_TIME_PERIOD", "Get checks per period"],
    // ["DELETE_CHECK", "Delete check"],
    // cashier commands
    // ["GET_SELF_DAILY_CHECKS (c)", "Get self daily checks"],
    // ["GER_SELF_CHECKS_PER_PERIOD (c)", "Get self checks per period"],
    ["POST_ADD_CHECK", "Add new check"],
]);