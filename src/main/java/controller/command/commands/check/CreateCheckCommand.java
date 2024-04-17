package controller.command.commands.check;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Check;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateCheckCommand implements Command {

    private final CheckService checkService;

    public CreateCheckCommand(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Check check = CommandFactory.getAttributes(request, Check.class);
        checkService.create(check);
        return JSON.gson().toJson("");
    }
}
