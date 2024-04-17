package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Sale;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;

public class GetFullChecksByEmployeePerPeriod implements Command {

    private final SaleService saleService;

    public GetFullChecksByEmployeePerPeriod(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<List<Sale>> sales = saleService.getFullChecksByEmployeeIdPerPeriod(hashMap.get("id_employee"), Date.valueOf(hashMap.get("start")), Date.valueOf(hashMap.get("end")));
        return JSON.gson().toJson(sales);
    }
}
