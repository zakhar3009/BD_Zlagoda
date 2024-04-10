package controller.command.commands.cutomerCard;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.CustomerCard;
import service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateCustomerCardCommand implements Command {

    private final CustomerService customerService;

    public CreateCustomerCardCommand(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        CustomerCard customerCard = CommandFactory.getAttributes(request, CustomerCard.class);
        customerService.create(customerCard);
        return JSON.gson().toJson("");
    }
}
