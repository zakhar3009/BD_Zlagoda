package controller.command.commands;

import controller.command.Command;

public enum CashierCommands {


    GET_ALL_PRODUCTS_ORDER_BY_NAME {
        {
            this.key = "GET_ALL_PRODUCTS_ORDER_BY_NAME";
        }
    },
    GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME{
        {
            this.key = "GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME";
        }
    },
    GET_ALL_CLIENTS_ORDER_BY_SURNAME{
        {
            this.key = "GET_ALL_CLIENTS_ORDER_BY_SURNAME";
        }
    },
    SEARCH_PRODUCT_BY_NAME{
        {
            this.key = "SEARCH_PRODUCT_BY_NAME";
        }
    },
    SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME{
        {
            this.key = "SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME";
        }
    },
    SEARCH_CLIENTS_BY_SURNAME{
        {
            this.key = "SEARCH_CLIENTS_BY_SURNAME";
        }
    },
    POST_ADD_CHECK{
        {
            this.key = "POST_ADD_CHECK";
        }
    },
    POST_ADD_CLIENT{
        {
            this.key = "POST_ADD_CLIENT";
        }
    },
    POST_UPDATE_CLIENT{
        {
            this.key = "POST_UPDATE_CLIENT";
        }
    },
    GET_CHECKS_BY_CASHIER_IN_DAY{
        {
            this.key = "GET_CHECKS_BY_CASHIER_IN_DAY";
        }
    },
    GET_CHECKS_BY_CASHIER_IN_TIME_PERIOD{
        {
            this.key = "GET_CHECKS_BY_CASHIER_IN_TIME_PERIOD";
        }
    },
    GET_CHECK_BY_NUMBER{
        {
            this.key = "GET_CHECK_BY_NUMBER";
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
    GET_PRODUCT_INFO_BY_UPC{
        {
            this.key = "GET_PRODUCT_INFO_BY_UPC";
        }
    },
    GET_SELF_INFO{
        {
            this.key = "GET_SELF_INFO";
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
        for (final CashierCommands command : CashierCommands.values()) {
            if (command.getKey().equals(key)) {
                return command.getCommand();
            }
        }
        return null;
    }

}
