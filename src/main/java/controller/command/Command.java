package controller.command;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


public interface Command {
    String execute(HttpServletRequest request) throws IOException;
}
