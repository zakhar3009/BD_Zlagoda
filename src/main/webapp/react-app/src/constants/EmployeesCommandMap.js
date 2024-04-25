const defaultTableNames =
  [
    "name",
    "surname",
    "patronymic",
    "role",
    "phoneNumber",
    "dateOfBirth",
    "dateOfStart",
    "salary",
    "city",
    "street",
    "zipCode"
]
const reportTableNames =
    [
        "empl_surname",
        "empl_name",
        "products_number",
        "checks_number",
    ]

const topEmployeesColumns = [
    "empl_surname",
    "empl_name",
    "empl_patronymic",
    "total_products_sold",
    "total_sales"
]

export const employeesTableMap = new Map([
  ["GET_ALL_EMPLOYEES", defaultTableNames],
  ["GET_ALL_EMPLOYEES_ORDER_BY_SURNAME", defaultTableNames],
  ["GET_ALL_CASHIERS_ORDER_BY_SURNAME", defaultTableNames],
  [
    "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME",
    ["surname", "phoneNumber", "city", "street"],
  ],
    ["GET_CASHIERS_CHECK_AND_SALES_REPORT", reportTableNames],
    ["GET_TOP_EMPLOYEES_BY_SALES", topEmployeesColumns]
]);

export const employeesCommandMap = new Map([
  ["GET_ALL_EMPLOYEES","Employees"],
  // ["GET_ALL_EMPLOYEES_ORDER_BY_SURNAME", "Get all employees order by surname"],
  // ["GET_ALL_CASHIERS_ORDER_BY_SURNAME", "Get all cashiers order by surname"],
  // [
  //   "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME",
  //   "Search employee address and phone by surname",
  // ],
  ["POST_ADD_EMPLOYEE", "Add new employee"],
  ["POST_UPDATE_EMPLOYEE", "Update employee"],
  ["DELETE_EMPLOYEE", "Delete employee"],
]);
