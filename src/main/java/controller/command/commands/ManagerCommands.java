package controller.command.commands;

import controller.command.Command;
import controller.command.commands.auth.LogoutCommand;
import controller.command.commands.auth.PostLoginCommand;
import controller.command.commands.category.*;
import controller.command.commands.employee.*;
import service.CategoryService;
import service.EmployeeService;

public enum ManagerCommands {

    LOGOUT("LOGOUT", new LogoutCommand()),
    POST_LOGIN("POST_LOGIN", new PostLoginCommand(EmployeeService.getInstance())),
    POST_ADD_EMPLOYEE ("POST_ADD_EMPLOYEE", new PostAddEmployeeCommand(EmployeeService.getInstance())),
    POST_ADD_CLIENT ("POST_ADD_CLIENT", null),
    POST_ADD_CATEGORY("POST_ADD_CATEGORY", null),
    POST_ADD_PRODUCT("POST_ADD_PRODUCT", null),
    POST_ADD_PRODUCT_IN_SHOP("POST_ADD_PRODUCT_IN_SHOP", null),
    POST_UPDATE_EMPLOYEE("POST_UPDATE_EMPLOYEE", new UpdateEmployeeCommand(EmployeeService.getInstance())),
    POST_UPDATE_CLIENT("POST_UPDATE_CLIENT", null),
    POST_UPDATE_CATEGORY("POST_UPDATE_CATEGORY", null),
    POST_UPDATE_PRODUCT("POST_UPDATE_PRODUCT", null),
    POST_UPDATE_PRODUCT_IN_SHOP("POST_UPDATE_PRODUCT_IN_SHOP", null),
    DELETE_EMPLOYEE("DELETE_EMPLOYEE", new DeleteEmployeeCommand(EmployeeService.getInstance())),
    DELETE_CLIENT("DELETE_CLIENT", null),
    DELETE_CATEGORY("DELETE_CATEGORY", null),
    DELETE_PRODUCT("DELETE_PRODUCT", null),
    DELETE_PRODUCT_IN_SHOP("DELETE_PRODUCT_IN_SHOP", null),
    DELETE_CHECK("DELETE_CHECK", null),
    GET_ALL_EMPLOYEES ("GET_ALL_EMPLOYEES", new GetAllEmployeesCommand(EmployeeService.getInstance())),
    GET_ALL_CLIENTS("GET_ALL_CLIENTS", null),
    GET_ALL_CATEGORIES("GET_ALL_CATEGORIES", new GetAllCategoriesCommand(CategoryService.getInstance())),
    GET_ALL_PRODUCTS("GET_ALL_PRODUCTS", null),
    GET_ALL_PRODUCTS_IN_SHOP("GET_ALL_PRODUCTS_IN_SHOP", null),
    GET_ALL_CHECKS("GET_ALL_CHECKS", null),
    GET_ALL_EMPLOYEES_ORDER_BY_SURNAME("GET_ALL_EMPLOYEES_ORDER_BY_SURNAME", new GetAllEmployeeOrderBySurname(EmployeeService.getInstance())),
    GET_ALL_CASHIERS_ORDER_BY_SURNAME("GET_ALL_CASHIERS_ORDER_BY_SURNAME", new GetCashiersOrderBySurname(EmployeeService.getInstance())),
    GET_ALL_CLIENTS_ORDER_BY_SURNAME("GET_ALL_CLIENTS_ORDER_BY_SURNAME", null),
    GET_ALL_CATEGORIES_ORDER_BY_NAME("GET_ALL_CATEGORIES_ORDER_BY_NAME", null),
    GET_ALL_PRODUCTS_ORDER_BY_NAME("GET_ALL_PRODUCTS_ORDER_BY_NAME", null),
    GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY("GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", null),
    SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME("SEARCH_EMPLOYEE_BY_SURNAME", new GetEmployeeAddressAndPhoneBySurname(EmployeeService.getInstance())),
    GET_CLIENTS_HAVING_CUSTOMER_CARD_ORDER_BY_SURNAME("GET_CLIENTS_HAVING_CUSTOMER_CARD_ORDER_BY_SURNAME", null),
    GET_EMPLOYEE_BY_ID("GET_EMPLOYEE_BY_ID", new GetEmployeeById(EmployeeService.getInstance())),
    GET_PRODUCTS_BY_CATEGORY_ORDER_BY_CATEGORY("GET_PRODUCTS_BY_CATEGORY_ORDER_BY_CATEGORY", null),
    GET_PRODUCT_BY_UPC("GET_PRODUCT_BY_UPC", null),
    GET_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", null),
    GET_PROM_PRODUCTS_ORDER_BY_NAME("GET_PROM_PRODUCTS_ORDER_BY_NAME", null),
    GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", null),
    GET_NON_PROM_PRODUCTS_ORDER_BY_NAME("GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", null),
    GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD("GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD", null),
    GET_ALL_CHECKS_BY_TIME_PERIOD("GET_ALL_CHECKS_BY_TIME_PERIOD", null),
    GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD("GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD", null),
    GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD("GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD", null),
    GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD("GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD", null);

    ManagerCommands(String commandKey, Command command){
        this.key = commandKey;
        this.command = command;
    }

    private String key;
    private Command command;

    public Command getCommand() {
        return command;
    }

    public String getKey() {
        return key;
    }

}