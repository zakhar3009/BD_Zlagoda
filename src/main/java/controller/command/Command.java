package controller.command;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public interface Command {
    String execute(HttpServletRequest request) throws IOException;
}
