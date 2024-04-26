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

public class GetCustomerCheckedOutByCashiers implements Command {

    private final CustomerService customerService;

    public GetCustomerCheckedOutByCashiers(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<CustomerCard> result = customerService.getCustomerCheckedOutByCashiers(hashMap.get("id_employee"));
        return JSON.gson().toJson(result);
    }
}
