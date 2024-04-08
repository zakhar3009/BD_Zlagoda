export const employeesTableMap = new Map([
    ["GET_ALL_EMPLOYEES", ["name", "surname", "patronymic", "role","phoneNumber", "dateOfBirth", "dateOfStart", "salary", "city","street", "zipCode"]],
    ["GET_ALL_EMPLOYEES_ORDER_BY_SURNAME", ["name", "surname", "patronymic", "role","phoneNumber", "dateOfBirth", "dateOfStart", "salary", "city","street", "zipCode"]],
    ["GET_ALL_CASHIERS_ORDER_BY_SURNAME", ["name", "surname", "patronymic", "role","phoneNumber", "dateOfBirth", "dateOfStart", "salary", "city","street", "zipCode"]],
    ["SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME", ["surname", "phoneNumber", "city", "street"]]
]);

export const employeesCommandMap = new Map([
    ["GET_ALL_EMPLOYEES", "Get all employees"],
    ['GET_ALL_EMPLOYEES_ORDER_BY_SURNAME', 'Get all employees order by surname'],
    ['GET_ALL_CASHIERS_ORDER_BY_SURNAME', 'Get all cashiers order by surname'],
    ['SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME', 'Search employee address and phone by surname'],
    ['POST_ADD_EMPLOYEE', 'Add new employee'],
    ['POST_UPDATE_EMPLOYEE', 'Update employee'],
    ['DELETE_EMPLOYEE', 'Delete employee']
    ]);