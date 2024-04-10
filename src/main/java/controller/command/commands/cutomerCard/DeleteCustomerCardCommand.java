package controller.command.commands.cutomerCard;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteCustomerCardCommand implements Command {

    private final CustomerService customerService;

    public DeleteCustomerCardCommand(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        customerService.delete(hashMap.get("id"));
        return JSON.gson().toJson("");
    }
}
