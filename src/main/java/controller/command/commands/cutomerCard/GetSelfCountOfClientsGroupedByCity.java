package controller.command.commands.cutomerCard;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class GetSelfCountOfClientsGroupedByCity implements Command {

    private final CustomerService customerService;

    public GetSelfCountOfClientsGroupedByCity(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        HashMap<String, String> result = customerService.getSelfCountOfClientsGroupedByCity(hashMap.get("employee_id"));
        return JSON.gson().toJson(result);
    }
}
