package controller.command.commands.check;

import controller.command.Command;
import controller.utils.JSON;
import entity.Check;
import service.CheckService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllChecksCommand implements Command {

    private final CheckService checkService;

    public GetAllChecksCommand(CheckService checkService) {
        this.checkService = checkService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Check> checks = checkService.getAll();
        return JSON.gson().toJson(checks);
    }
}
