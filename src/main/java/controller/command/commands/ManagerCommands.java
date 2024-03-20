package controller.command.commands;

import controller.command.PageNotFoundCommand;
import controller.command.Command;

public enum CommandEnum {
    POST_ADD_EMPLOYEE{

    },
    POST_ADD_CLIENT{

    },
    POST_ADD_CATEGORY{

    },
    POST_ADD_PRODUCT{

    },
    POST_ADD_PRODUCT_IN_SHOP{

    },
    POST_UPDATE_EMPLOYEE{

    },
    POST_UPDATE_CLIENT{

    },
    POST_UPDATE_CATEGORY{

    },
    POST_UPDATE_PRODUCT{

    },
    POST_UPDATE_PRODUCT_IN_SHOP{

    },
    DELETE_EMPLOYEE{

    },
    DELETE_CLIENT{

    },
    DELETE_CATEGORY{

    },
    DELETE_PRODUCT{

    },
    DELETE_PRODUCT_IN_SHOP{

    },
    DELETE_CHECK{

    },
    GET_ALL_EMPLOYEES{

    },
    GET_ALL_CLIENTS{

    },
    GET_ALL_CATEGORIES{

    },
    GET_ALL_PRODUCTS{

    },
    GET_ALL_PRODUCTS_IN_SHOP{

    },
    GET_ALL_CHECKS{

    },
    GET_ALL_EMPLOYEES_SORTED_BY_SURNAME{

    },
    GET_ALL_CASHIERS_SORTED_BY_SURNAME{

    },
    GET_ALL_CLIENTS_SORTED_BY_SURNAME{

    },
    GET_ALL_CATEGORIES_SORTED_BY_NAME{

    },
    GET_ALL_PRODUCTS_SORTED_BY_SURNAME{

    },
    GET_ALL_PRODUCTS_IN_SHOP_SORTED_BU_QUANTITY{

    },
    SEARCH_EMPLOYEE_BY_SURNAME{

    },
    GET_CLIENTS_HAVING_CUSTOMER_CARD_ORDER_BY_SURNAME(),
    GET_PRODUCTS_BY_CATEGORY_ORDER_BY_CATEGORY(),
    GET_PRODUCT_BY_UPC(),
    GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY_AND_NAME(),
    GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD(),
    GET_ALL_CHECKS_BY_TIME_PERIOD(),
    GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD(),
    GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD(),
    GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD(),





    GET_ALL_PRODUCTS_SORTED_BY_NAME(),
    GET_ALL_PRODUCTS_IN_SHOP_SORTED_BY_NAME(),

    SEARCH_PRODUCT_BY_NAME(),
    




    PAGE_NOT_FOUND {
        {
            this.key = "GET:pageNotFound";
            this.command = new PageNotFoundCommand();
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
        for (final CommandEnum command : CommandEnum.values()) {
            if (command.getKey().equals(key)) {
                return command.getCommand();
            }
        }
        return PAGE_NOT_FOUND.getCommand();
    }
}
