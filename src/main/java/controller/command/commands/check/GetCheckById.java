package controller.command.commands.check;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Check;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class GetCheckById implements Command {

    private final CheckService checkService;

    public GetCheckById(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        Optional<Check> check = checkService.getById(hashMap.get("check_number"));
        return check.map(value -> JSON.gson().toJson(value)).orElse(null);
    }
}
