package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Sale;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class GetFullCheckByNumber implements Command {

    private final SaleService saleService;

    public GetFullCheckByNumber(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<Sale> sales = saleService.getFullCheckByNumber(hashMap.get("check_number"));
        return JSON.gson().toJson(sales);
    }
}
