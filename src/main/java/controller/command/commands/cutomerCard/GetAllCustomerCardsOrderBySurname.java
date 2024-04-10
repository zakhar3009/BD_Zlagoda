package controller.command.commands.cutomerCard;

import controller.command.Command;
import controller.utils.JSON;
import entity.CustomerCard;
import service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllCustomerCardsOrderBySurname implements Command {

    private final CustomerService customerService;

    public GetAllCustomerCardsOrderBySurname(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<CustomerCard> customerCards = customerService.getAllOrderBySurname();
        return JSON.gson().toJson(customerCards);
    }
}
