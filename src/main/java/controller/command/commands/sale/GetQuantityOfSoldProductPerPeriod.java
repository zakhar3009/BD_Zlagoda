package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;

public class GetQuantityOfSoldProductPerPeriod implements Command {
    private final SaleService saleService;

    public GetQuantityOfSoldProductPerPeriod(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        int quantity = saleService.getQuantityOfSoldProductPerPeriod(hashMap.get("UPC"),
                Date.valueOf(hashMap.get("start")),
                Date.valueOf(hashMap.get("end")));
        HashMap<String, Integer> result = new HashMap<>();
        result.put("quantity", quantity);
        return JSON.gson().toJson(result);
    }
}
