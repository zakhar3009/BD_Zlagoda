package controller.command.commands.auth;

import controller.command.Command;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class LogoutCommand implements Command {

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        SessionManager.getInstance().invalidateSession(request.getSession());

        return null;
    }
}
