package controller.command.commands.check;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;

public class GetChecksSumPerPeriod implements Command {

    private final CheckService checkService;

    public GetChecksSumPerPeriod(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        double sum = checkService.getChecksSumPerPeriod(Date.valueOf(hashMap.get("start")), Date.valueOf(hashMap.get("end")));
        HashMap<String, Double> result = new HashMap<>();
        result.put("total_sum", sum);
        return JSON.gson().toJson(result);
    }
}
