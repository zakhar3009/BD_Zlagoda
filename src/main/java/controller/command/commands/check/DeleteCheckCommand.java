package controller.command.commands.check;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteCheckCommand implements Command {

    private final CheckService checkService;

    public DeleteCheckCommand(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        checkService.delete(hashMap.get("check_number"));
        return JSON.gson().toJson("");
    }
}
