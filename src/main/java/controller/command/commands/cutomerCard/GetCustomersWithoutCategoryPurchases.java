package controller.command.commands.cutomerCard;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.CustomerCard;
import service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class GetCustomersWithoutCategoryPurchases implements Command {

    private final CustomerService customerService;

    public GetCustomersWithoutCategoryPurchases(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<CustomerCard> customerCards = customerService.getCustomersWithoutCategoryPurchases(hashMap.get("category_name"));
        return JSON.gson().toJson(customerCards);
    }
}
