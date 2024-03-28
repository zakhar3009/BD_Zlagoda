package controller.command;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.HashMap;

public interface Command {

    String execute(HashMap<String, String> attributes) throws IOException;
}
