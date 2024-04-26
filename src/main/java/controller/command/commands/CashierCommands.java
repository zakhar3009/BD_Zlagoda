package controller.command.commands;

import controller.command.Command;
import controller.command.commands.auth.LogoutCommand;
import controller.command.commands.auth.PostLoginCommand;
import controller.command.commands.category.GetAllCategoriesCommand;
import controller.command.commands.check.CreateCheckCommand;
import controller.command.commands.check.GetCheckById;
import controller.command.commands.check.GetSelfChecksPerPeriod;
import controller.command.commands.check.GetSelfDailyChecksCommand;
import controller.command.commands.cutomerCard.*;
import controller.command.commands.employee.GetCashiersOrderBySurname;
import controller.command.commands.employee.GetEmployeeById;
import controller.command.commands.product.GetAllProductsByPartOfNameCommand;
import controller.command.commands.product.GetAllProductsOrderByName;
import controller.command.commands.product.GetProductsByCategoryOrderByName;
import controller.command.commands.sale.GetFullCheckByNumber;
import controller.command.commands.storeProduct.*;
import service.*;

public enum CashierCommands {

    LOGOUT("LOGOUT", new LogoutCommand()),
    POST_LOGIN("POST_LOGIN", new PostLoginCommand(EmployeeService.getInstance())),
    GET_ALL_PRODUCTS_ORDER_BY_NAME("GET_ALL_PRODUCTS_ORDER_BY_NAME", new GetAllProductsOrderByName(ProductService.getInstance())),
    GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME("GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_NAME", new GetAllStoreProductsOrderByName(StoreProductService.getInstance())),
    GET_ALL_CLIENTS_ORDER_BY_SURNAME("GET_ALL_CLIENTS_ORDER_BY_SURNAME", new GetAllCustomerCardsOrderBySurname(CustomerService.getInstance())),
    GET_ALL_CATEGORIES("GET_ALL_CATEGORIES", new GetAllCategoriesCommand(CategoryService.getInstance())),
    GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME("GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME", new GetProductsByCategoryOrderByName(ProductService.getInstance())),
    SEARCH_PRODUCT_BY_PART_OF_NAME("SEARCH_PRODUCT_BY_NAME", new GetAllProductsByPartOfNameCommand(ProductService.getInstance())),
    SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME("SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME", new GetProductsByCategoryOrderByName(ProductService.getInstance())),
    GET_CLIENTS_BY_PART_OF_SURNAME("GET_CLIENTS_BY_PART_OF_SURNAME", new GetCustomerCardsByPartOfSurname(CustomerService.getInstance())),
    POST_ADD_CHECK("POST_ADD_CHECK", new CreateCheckCommand(CheckService.getInstance())),
    GET_CLIENT_BY_ID("GET_CLIENT_BY_ID", new GetCustomerCardByIdCommand(CustomerService.getInstance())),
    POST_ADD_CLIENT("POST_ADD_CLIENT", new CreateCustomerCardCommand(CustomerService.getInstance())),
    POST_UPDATE_CLIENT("POST_UPDATE_CLIENT", new UpdateCustomerCardCommand(CustomerService.getInstance())),
    GET_SELF_DAILY_CHECKS("GET_SELF_DAILY_CHECKS", new GetSelfDailyChecksCommand(CheckService.getInstance())),
    GER_SELF_CHECKS_PER_PERIOD("GET_SELF_CHECKS_PER_PERIOD", new GetSelfChecksPerPeriod(CheckService.getInstance())),
    GET_CHECK_BY_NUMBER("GET_CHECK_BY_NUMBER", new GetCheckById(CheckService.getInstance())),
    GET_FULL_CHECK_BY_NUMBER("GET_FULL_CHECK_BY_NUMBER", new GetFullCheckByNumber(SaleService.getInstance())),
    GET_ALL_PRODUCTS_IN_SHOP("GET_ALL_PRODUCTS_IN_SHOP", new GetAllStoreProductsCommand(StoreProductService.getInstance())),
    GET_ALL_CASHIERS_ORDER_BY_SURNAME("GET_ALL_CASHIERS_ORDER_BY_SURNAME", new GetCashiersOrderBySurname(EmployeeService.getInstance())),
    SEARCH_STORE_PRODUCTS_PART_OF_UPC("SEARCH_STORE_PRODUCTS_PART_OF_UPC", new GetAllStoreProductsByPartOfUpcCommand(StoreProductService.getInstance())),
    GET_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", new GetPromProductsOrderByQuantity(StoreProductService.getInstance())),
    GET_PROM_PRODUCTS_ORDER_BY_NAME("GET_PROM_PRODUCTS_ORDER_BY_NAME", new GetPromProductsOrderByName(StoreProductService.getInstance())),
    GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", new GetNonPromProductsOrderByQuantity(StoreProductService.getInstance())),
    GET_NON_PROM_PRODUCTS_ORDER_BY_NAME("GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", new GetNonPromProductsOrderByName(StoreProductService.getInstance())),
    GET_PRODUCT_INFO_BY_UPC("GET_PRODUCT_INFO_BY_UPC", new GetStoreProductByIdCommand(StoreProductService.getInstance())),
    GET_SELF_INFO("GET_SELF_INFO", new GetEmployeeById(EmployeeService.getInstance())),
    CUSTOMERS_WITHOUT_CATEGORY_PURCHASES("CUSTOMERS_WITHOUT_CATEGORY_PURCHASES", new GetCustomersWithoutCategoryPurchases(CustomerService.getInstance())),
    GET_CUSTOMERS_NO_CASHIER_CHECKOUTS_NO_PURCHASES_THIS_YEAR("GET_CUSTOMERS_NO_CASHIER_CHECKOUTS_NO_PURCHASES_THIS_YEAR", new GetCustomersNoCashierCheckoutsNoPurchasesThisYear(CustomerService.getInstance()));


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
