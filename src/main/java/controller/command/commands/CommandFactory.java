package controller.command.commands;

import controller.command.Command;

import javax.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

public class CommandFactory {

    private CommandFactory() {}

    public static Command getManagerCommand(HttpServletRequest request) {
        HashMap<String, String> attributes = getAttributes(request);
        return ManagerCommands.valueOf(attributes.get("command_name")).getCommand();
    }

    public static Command getCashierCommand(HttpServletRequest request){
        HashMap<String, String> attributes = getAttributes(request);
        return CashierCommands.valueOf(attributes.get("command_name")).getCommand();
    }

    public static HashMap<String, String> getAttributes(HttpServletRequest request){
        Enumeration<String> attributeNames = request.getAttributeNames();
        List<String> attributeList = Collections.list(attributeNames);
        HashMap<String, String> attributes = new HashMap<>();
        for (String attributeName : attributeList) {
            attributes.put(attributeName, (String) request.getAttribute(attributeName));
        }
        return attributes;
    }
}

