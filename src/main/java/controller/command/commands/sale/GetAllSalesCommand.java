package controller.command.commands.sale;

import controller.command.Command;
import controller.utils.JSON;
import entity.Sale;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllSalesCommand implements Command {

    private final SaleService saleService;

    public GetAllSalesCommand(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Sale> list = saleService.getAll();
        return JSON.gson().toJson(list);
    }
}
