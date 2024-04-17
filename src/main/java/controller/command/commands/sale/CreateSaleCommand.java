package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Sale;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateSaleCommand implements Command {

    private final SaleService saleService;

    public CreateSaleCommand(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Sale sale = CommandFactory.getAttributes(request, Sale.class);
        saleService.create(sale);
        return JSON.gson().toJson("");
    }
}
