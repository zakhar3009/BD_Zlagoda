package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Check;
import entity.Sale;
import service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;

public class GetFullChecksPerPeriod implements Command {

    private final SaleService saleService;

    public GetFullChecksPerPeriod(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<Check> checks = saleService.getFullChecksPerPeriod(Date.valueOf(hashMap.get("start")), Date.valueOf(hashMap.get("end")));
        return JSON.gson().toJson(checks);
    }
}
