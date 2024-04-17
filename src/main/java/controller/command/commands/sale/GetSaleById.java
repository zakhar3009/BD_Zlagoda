package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Sale;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class GetSaleById implements Command {

    private final SaleService saleService;

    public GetSaleById(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> id = CommandFactory.getParameters(request);
        Optional<Sale> sale = saleService.getById(id);
        return sale.map(value -> JSON.gson().toJson(value)).orElse(null);
    }
}
