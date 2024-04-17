package controller.command.commands.check;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Check;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;

public class GetSelfChecksPerPeriod implements Command {

    private final CheckService checkService;

    public GetSelfChecksPerPeriod(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<Check> checks = checkService.getSelfChecksPerPeriod(hashMap.get("id_employee"),
                Date.valueOf(hashMap.get("start")), Date.valueOf(hashMap.get("end")));
        return JSON.gson().toJson(checks);
    }
}
