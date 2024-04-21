package controller.command.commands.check;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Check;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

public class CreateCheckCommand implements Command {

    private final CheckService checkService;

    public CreateCheckCommand(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Check check = CommandFactory.getAttributes(request, Check.class);
        String randomId = UUID.randomUUID().toString().substring(0, 10);
        check.setNumber(randomId);
        checkService.create(check);
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("check_number", randomId);
        return JSON.gson().toJson(hashMap);
    }
}
