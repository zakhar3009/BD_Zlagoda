package controller.command.commands;

import controller.command.Command;
import controller.command.commands.auth.LogoutCommand;
import controller.command.commands.auth.PostLoginCommand;
import controller.command.commands.category.*;
import controller.command.commands.check.*;
import controller.command.commands.cutomerCard.*;
import controller.command.commands.employee.*;
import controller.command.commands.product.*;
import controller.command.commands.sale.GetFullCheckByNumber;
import controller.command.commands.sale.GetFullChecksByEmployeePerPeriod;
import controller.command.commands.sale.GetFullChecksPerPeriod;
import controller.command.commands.sale.GetQuantityOfSoldProductPerPeriod;
import controller.command.commands.storeProduct.*;
import service.*;

public enum ManagerCommands {

    LOGOUT("LOGOUT", new LogoutCommand()),
    POST_LOGIN("POST_LOGIN", new PostLoginCommand(EmployeeService.getInstance())),
    POST_ADD_EMPLOYEE("POST_ADD_EMPLOYEE", new PostAddEmployeeCommand(EmployeeService.getInstance())),
    POST_ADD_CLIENT("POST_ADD_CLIENT", new CreateCustomerCardCommand(CustomerService.getInstance())),
    POST_ADD_CATEGORY("POST_ADD_CATEGORY", new CreateCategoryCommand(CategoryService.getInstance())),
    POST_ADD_PRODUCT("POST_ADD_PRODUCT", new CreateProductCommand(ProductService.getInstance())),
    POST_ADD_PRODUCT_IN_SHOP("POST_ADD_PRODUCT_IN_SHOP", new CreateStoreProductCommand(StoreProductService.getInstance())),
    POST_ADD_PROM_PRODUCT_IN_SHOP("POST_ADD_PROM_PRODUCT_IN_SHOP", new CreatePromStoreProduct(StoreProductService.getInstance())),
    POST_UPDATE_EMPLOYEE("POST_UPDATE_EMPLOYEE", new UpdateEmployeeCommand(EmployeeService.getInstance())),
    POST_UPDATE_CLIENT("POST_UPDATE_CLIENT", new UpdateCustomerCardCommand(CustomerService.getInstance())),
    POST_UPDATE_CATEGORY("POST_UPDATE_CATEGORY", new UpdateCategoryCommand(CategoryService.getInstance())),
    POST_UPDATE_PRODUCT("POST_UPDATE_PRODUCT", new UpdateProductCommand(ProductService.getInstance())),
    POST_UPDATE_PRODUCT_IN_SHOP("POST_UPDATE_PRODUCT_IN_SHOP", new UpdateStoreProductCommand(StoreProductService.getInstance())),
    DELETE_EMPLOYEE("DELETE_EMPLOYEE", new DeleteEmployeeCommand(EmployeeService.getInstance())),
    DELETE_CLIENT("DELETE_CLIENT", new DeleteCustomerCardCommand(CustomerService.getInstance())),
    DELETE_CATEGORY("DELETE_CATEGORY", new DeleteCategoryCommand(CategoryService.getInstance())),
    DELETE_PRODUCT("DELETE_PRODUCT", new DeleteProductCommand(ProductService.getInstance())),
    DELETE_PRODUCT_IN_SHOP("DELETE_PRODUCT_IN_SHOP", new DeleteStoreProductCommand(StoreProductService.getInstance())),
    DELETE_PROM_STORE_PRODUCT("DELETE_PROM_STORE_PRODUCT", new DeletePromStoreProduct(StoreProductService.getInstance())),
    DELETE_CHECK("DELETE_CHECK", new DeleteCheckCommand(CheckService.getInstance())),
    GET_ALL_EMPLOYEES("GET_ALL_EMPLOYEES", new GetAllEmployeesCommand(EmployeeService.getInstance())),
    GET_ALL_CLIENTS("GET_ALL_CLIENTS", new GetAllCustomerCardsCommand(CustomerService.getInstance())),
    GET_ALL_CATEGORIES("GET_ALL_CATEGORIES", new GetAllCategoriesCommand(CategoryService.getInstance())),
    GET_ALL_PRODUCTS("GET_ALL_PRODUCTS", new GetAllProductsCommand(ProductService.getInstance())),
    GET_ALL_PRODUCTS_IN_SHOP("GET_ALL_PRODUCTS_IN_SHOP", new GetAllStoreProductsCommand(StoreProductService.getInstance())),
    GET_ALL_CHECKS("GET_ALL_CHECKS", new GetAllChecksCommand(CheckService.getInstance())),
    GET_ALL_EMPLOYEES_ORDER_BY_SURNAME("GET_ALL_EMPLOYEES_ORDER_BY_SURNAME", new GetAllEmployeeOrderBySurname(EmployeeService.getInstance())),
    GET_ALL_CASHIERS_ORDER_BY_SURNAME("GET_ALL_CASHIERS_ORDER_BY_SURNAME", new GetCashiersOrderBySurname(EmployeeService.getInstance())),
    GET_ALL_CLIENTS_ORDER_BY_SURNAME("GET_ALL_CLIENTS_ORDER_BY_SURNAME", new GetAllCustomerCardsOrderBySurname(CustomerService.getInstance())),
    GET_ALL_CATEGORIES_ORDER_BY_NAME("GET_ALL_CATEGORIES_ORDER_BY_NAME", new GetAllCategoriesOrderByName(CategoryService.getInstance())),
    GET_ALL_PRODUCTS_ORDER_BY_NAME("GET_ALL_PRODUCTS_ORDER_BY_NAME", new GetAllProductsOrderByName(ProductService.getInstance())),
    GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY("GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY", new GetAllStoreProductOrderByQuantity(StoreProductService.getInstance())),
    SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME("SEARCH_EMPLOYEE_BY_SURNAME", new GetEmployeeAddressAndPhoneBySurname(EmployeeService.getInstance())),
    GET_CLIENTS_BY_PART_OF_SURNAME("GET_CLIENTS_BY_PART_OF_SURNAME", new GetCustomerCardsByPartOfSurname(CustomerService.getInstance())),
    // Command to get clients by percent from user and order surname
    GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME("GET_CLIENTS_BY_PERCENT_ORDER_BY_SURNAME", new GetCustomersByPercentOrderBySurname(CustomerService.getInstance())),
    GET_EMPLOYEE_BY_ID("GET_EMPLOYEE_BY_ID", new GetEmployeeById(EmployeeService.getInstance())),
    GET_CATEGORY_BY_ID("GET_CATEGORY_BY_ID", new GetCategoryByID(CategoryService.getInstance())),
    GET_CLIENT_BY_ID("GET_CLIENT_BY_ID", new GetCustomerCardByIdCommand(CustomerService.getInstance())),
    GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME("GET_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME", new GetProductsByCategoryOrderByName(ProductService.getInstance())),
    GET_PRODUCT_BY_UPC("GET_PRODUCT_BY_UPC", new GetStoreProductByIdCommand(StoreProductService.getInstance())),
    GET_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_PROM_PRODUCTS_ORDER_BY_QUANTITY", new GetPromProductsOrderByQuantity(ProductService.getInstance())),
    GET_PROM_PRODUCTS_ORDER_BY_NAME("GET_PROM_PRODUCTS_ORDER_BY_NAME", new GetPromProductsOrderByName(ProductService.getInstance())),
    GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY("GET_NON_PROM_PRODUCTS_ORDER_BY_QUANTITY", new GetNonPromProductsOrderByQuantity(ProductService.getInstance())),
    GET_NON_PROM_PRODUCTS_ORDER_BY_NAME("GET_NON_PROM_PRODUCTS_ORDER_BY_NAME", new GetNonPromProductsOrderByName(ProductService.getInstance())),
    GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD("GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD", new GetFullChecksByEmployeePerPeriod(SaleService.getInstance())),
    GET_ALL_CHECKS_BY_CASHIER("GET_ALL_CHECKS_BY_CASHIER", new GetAllChecksByCashierCommand(CheckService.getInstance())),
    GET_ALL_CHECKS_BY_TIME_PERIOD("GET_ALL_CHECKS_BY_TIME_PERIOD", new GetFullChecksPerPeriod(SaleService.getInstance())),
    GET_FULL_CHECK_BY_NUMBER("GET_FULL_CHECK_BY_NUMBER", new GetFullCheckByNumber(SaleService.getInstance())),
    GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD("GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD", new GetChecksSumByEmployeePerPeriod(CheckService.getInstance())),
    GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD("GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD", new GetChecksSumPerPeriod(CheckService.getInstance())),
    GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD("GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD", new GetQuantityOfSoldProductPerPeriod(SaleService.getInstance()));

    ManagerCommands(String commandKey, Command command) {
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