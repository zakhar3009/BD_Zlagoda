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

public class GetCustomersNoCashierCheckoutsNoPurchasesThisYear implements Command {

    private final CustomerService customerService;

    public GetCustomersNoCashierCheckoutsNoPurchasesThisYear(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<CustomerCard> customerCards = customerService.getCustomersNoCashierCheckoutsNoPurchasesThisYear(hashMap.get("id_employee"));
        return JSON.gson().toJson(customerCards);
    }
}
