package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteSaleCommand implements Command {

    private final SaleService saleService;

    public DeleteSaleCommand(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        saleService.delete(hashMap);
        return JSON.gson().toJson("");
    }
}
