package controller.command.commands.cutomerCard;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.CustomerCard;
import service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class GetCustomerCardByIdCommand implements Command {

    private final CustomerService customerService;

    public GetCustomerCardByIdCommand(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        Optional<CustomerCard> customerCard = customerService.getById(hashMap.get("card_number"));
        return customerCard.map(value -> JSON.gson().toJson(value)).orElse(null);

    }
}
