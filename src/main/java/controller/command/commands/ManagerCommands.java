package controller.command.commands;
import controller.command.Command;

public enum ManagerCommands {
    POST_ADD_EMPLOYEE{
        {
            this.key = "POST_ADD_EMPLOYEE";
        }
    },
    POST_ADD_CLIENT{
        {
            this.key = "POST_ADD_CLIENT";
        }
    },
    POST_ADD_CATEGORY{
        {
            this.key = "POST_ADD_CATEGORY";
        }
    },
    POST_ADD_PRODUCT{
        {
            this.key = "POST_ADD_PRODUCT";
        }
    },
    POST_ADD_PRODUCT_IN_SHOP{
        {
            this.key = "POST_ADD_PRODUCT_IN_SHOP";
        }
    },
    POST_UPDATE_EMPLOYEE{
        {
            this.key = "POST_UPDATE_EMPLOYEE";
        }
    },
    POST_UPDATE_CLIENT{
        {
            this.key = "POST_UPDATE_CLIENT";
        }
    },
    POST_UPDATE_CATEGORY{
        {
            this.key = "POST_UPDATE_CATEGORY";
        }
    },
    POST_UPDATE_PRODUCT{
        {
            this.key = "POST_UPDATE_PRODUCT";
        }
    },
    POST_UPDATE_PRODUCT_IN_SHOP{
        {
            this.key = "POST_UPDATE_PRODUCT_IN_SHOP";
        }
    },
    DELETE_EMPLOYEE{
        {
            this.key = "DELETE_EMPLOYEE";
        }
    },
    DELETE_CLIENT{
        {
            this.key = "DELETE_CLIENT";
        }
    },
    DELETE_CATEGORY{
        {
            this.key = "DELETE_CATEGORY";
        }
    },
    DELETE_PRODUCT{
        {
            this.key = "DELETE_PRODUCT";
        }
    },
    DELETE_PRODUCT_IN_SHOP{
        {
            this.key = "DELETE_PRODUCT_IN_SHOP";
        }
    },
    DELETE_CHECK{
        {
            this.key = "DELETE_CHECK";
        }
    },
    GET_ALL_EMPLOYEES{
        {
            this.key = "GET_ALL_EMPLOYEES";
        }
    },
    GET_ALL_CLIENTS{
        {
            this.key = "GET_ALL_CLIENTS";
        }
    },
    GET_ALL_CATEGORIES{
        {
            this.key = "GET_ALL_CATEGORIES";
        }
    },
    GET_ALL_PRODUCTS{
        {
            this.key = "GET_ALL_PRODUCTS";
        }
    },
    GET_ALL_PRODUCTS_IN_SHOP{
        {
            this.key = "GET_ALL_PRODUCTS_IN_SHOP";
        }
    },
    GET_ALL_CHECKS{
        {
            this.key = "GET_ALL_CHECKS";
        }
    },
    GET_ALL_EMPLOYEES_ORDER_BY_SURNAME{
        {
            this.key = "GET_ALL_EMPLOYEES_ORDER_BY_SURNAME";
        }
    },
    GET_ALL_CASHIERS_ORDER_BY_SURNAME{
        {
            this.key = "GET_ALL_CASHIERS_ORDER_BY_SURNAME";
        }
    },
    GET_ALL_CLIENTS_ORDER_BY_SURNAME{
        {
            this.key = "GET_ALL_CLIENTS_ORDER_BY_SURNAME";
        }
    },
    GET_ALL_CATEGORIES_ORDER_BY_NAME{
        {
            this.key = "GET_ALL_CATEGORIES_ORDER_BY_NAME";
        }
    },
    GET_ALL_PRODUCTS_ORDER_BY_SURNAME{
        {
            this.key = "GET_ALL_PRODUCTS_ORDER_BY_SURNAME";
        }
    },
    GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY{
        {
            this.key = "GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY";
        }
    },
    SEARCH_EMPLOYEE_BY_SURNAME{
        {
            this.key = "SEARCH_EMPLOYEE_BY_SURNAME";
        }
    },
    GET_CLIENTS_HAVING_CUSTOMER_CARD_ORDER_BY_SURNAME{
        {
            this.key = "GET_CLIENTS_HAVING_CUSTOMER_CARD_ORDER_BY_SURNAME";
        }
    },
    GET_PRODUCTS_BY_CATEGORY_ORDER_BY_CATEGORY{
        {
            this.key = "GET_PRODUCTS_BY_CATEGORY_ORDER_BY_CATEGORY";
        }
    },
    GET_PRODUCT_BY_UPC{
        {
            this.key = "GET_PRODUCT_BY_UPC";
        }
    },
    GET_PROM_PRODUCTS_ORDER_BY_QUANTITY{
        {
            this.key = "GET_PROM_PRODUCTS_ORDER_BY_QUANTITY";
        }
    },
    GET_PROM_PRODUCTS_ORDER_BY_NAME{
        {
            this.key = "GET_PROM_PRODUCTS_ORDER_BY_NAME";
        }
    },
    GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY{
        {
            this.key = "GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY";
        }
    },
    GET_NON_PROM_PRODUCTS_ORDER_BY_NAME{
        {
            this.key = "GET_NON_PROM_PRODUCTS_ORDER_BY_NAME";
        }
    },
    GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD{
        {
            this.key = "GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD";
        }
    },
    GET_ALL_CHECKS_BY_TIME_PERIOD{
        {
            this.key = "GET_ALL_CHECKS_BY_TIME_PERIOD";
        }
    },
    GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD{
        {
            this.key = "GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD";
        }
    },
    GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD{
        {
            this.key = "GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD";
        }
    },
    GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD{
        {
            this.key = "GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD";
        }
    };

    String key;
    Command command;

    public Command getCommand() {
        return command;
    }

    public String getKey() {
        return key;
    }

    public static Command getCommand(String key) {
        for (final ManagerCommands command : ManagerCommands.values()) {
            if (command.getKey().equals(key)) {
                return command.getCommand();
            }
        }
        return null;
    }
}
