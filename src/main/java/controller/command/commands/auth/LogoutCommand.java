package controller.command.commands.auth;

import controller.command.Command;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class LogoutCommand implements Command {

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        return null;
    }
}
