package controller.command.commands;

import controller.command.Command;
import controller.command.commands.auth.LogoutCommand;
import controller.command.commands.auth.PostLoginCommand;
import service.EmployeeService;

public enum CashierCommands {

    LOGOUT("LOGOUT", new LogoutCommand()),
    POST_LOGIN("POST_LOGIN", new PostLoginCommand(EmployeeService.getInstance())),
    GET_ALL_PRODUCTS_ORDER_BY_NAME("GET_ALL_PRODUCTS_ORDER_BY_NAME", null),
    GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME("GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME", null),
    GET_ALL_CLIENTS_ORDER_BY_SURNAME("GET_ALL_CLIENTS_ORDER_BY_SURNAME", null),
    SEARCH_PRODUCT_BY_NAME("SEARCH_PRODUCT_BY_NAME", null),
    SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME("SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME", null),
    SEARCH_CLIENTS_BY_SURNAME("SEARCH_CLIENTS_BY_SURNAME", null),
    POST_ADD_CHECK("POST_ADD_CHECK", null),
    POST_ADD_CLIENT("POST_ADD_CLIENT", null),
    POST_UPDATE_CLIENT("POST_UPDATE_CLIENT", null),
    GET_CHECKS_BY_CASHIER_IN_DAY("GET_CHECKS_BY_CASHIER_IN_DAY", null),
    GET_CHECKS_BY_CASHIER_IN_TIME_PERIOD("GET_CHECKS_BY_CASHIER_IN_TIME_PERIOD", null),
    GET_CHECK_BY_NUMBER("GET_CHECK_BY_NUMBER", null),
    GET_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", null),
    GET_PROM_PRODUCTS_ORDER_BY_NAME("GET_PROM_PRODUCTS_ORDER_BY_NAME", null),
    GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", null),
    GET_NON_PROM_PRODUCTS_ORDER_BY_NAME("GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", null),
    GET_PRODUCT_INFO_BY_UPC("GET_PRODUCT_INFO_BY_UPC", null),
    GET_SELF_INFO("GET_SELF_INFO", null);


    private String key;
    private Command command;

    CashierCommands(String commandKey, Command command){
        this.key = commandKey;
        this.command = command;
    }

    public Command getCommand() {
        return command;
    }

    public String getKey() {
        return key;
    }

    public static Command getCommand(String key) {
        return CashierCommands.valueOf(key).getCommand();
    }

}
