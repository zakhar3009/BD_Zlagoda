package controller.command.commands;

import com.fasterxml.jackson.databind.ObjectMapper;
import controller.command.Command;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

public class CommandFactory {

    private CommandFactory() {}

    public static Command getManagerCommand(HttpServletRequest request) {
        HashMap<String, String> attributes;
        if(request.getMethod().equals("GET")) attributes = getParameters(request);
        else attributes = getAttributes(request);
        return ManagerCommands.valueOf(attributes.get("command_name")).getCommand();
    }

    public static Command getCashierCommand(HttpServletRequest request){
        HashMap<String, String> attributes;
        if(request.getMethod().equals("GET")) attributes = getParameters(request);
        else attributes = getAttributes(request);
        return CashierCommands.valueOf(attributes.get("command_name")).getCommand();
    }


    public static HashMap<String, String> getParameters(HttpServletRequest request){
        Enumeration<String> parametersNames = request.getAttributeNames();
        List<String> attributeList = Collections.list(parametersNames);
        HashMap<String, String> attributes = new HashMap<>();
        for (String parameterName : attributeList) {
            attributes.put(parameterName, request.getParameter(parameterName));
        }
        return attributes;
    }
    public static HashMap<String, String> getAttributes(HttpServletRequest request) {
        try {
            StringBuilder requestBody = new StringBuilder();
            String line;
            BufferedReader reader = null;
            reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
            ObjectMapper objectMapper = new ObjectMapper();
            HashMap<String, String> attributes = objectMapper.readValue(requestBody.toString(), HashMap.class);
            return attributes;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

