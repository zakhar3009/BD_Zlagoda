package controller.command.commands;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
        String commandKey;
        if(request.getMethod().equals("GET")) commandKey = request.getParameter("command_name");
        else commandKey = request.getHeader("command_name");
        return ManagerCommands.valueOf(commandKey).getCommand();
    }

    public static Command getCashierCommand(HttpServletRequest request){
        String commandKey;
        if(request.getMethod().equals("GET")) commandKey = request.getParameter("command_name");
        else commandKey = request.getHeader("command_name");
        return CashierCommands.valueOf(commandKey).getCommand();
    }


    public static HashMap<String, String> getParameters(HttpServletRequest request){
        Enumeration<String> parametersNames = request.getParameterNames();
        List<String> attributeList = Collections.list(parametersNames);
        HashMap<String, String> attributes = new HashMap<>();
        for (String parameterName : attributeList) {
            attributes.put(parameterName, request.getParameter(parameterName));
        }
        return attributes;
    }
    public static <T> T getAttributes(HttpServletRequest request, Class<T> tClass) {
        try {
            StringBuilder requestBody = new StringBuilder();
            String line;
            BufferedReader reader = null;
            reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            T attributes = gson.fromJson(requestBody.toString(), tClass);
            return attributes;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}

