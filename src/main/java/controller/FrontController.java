package controller;


import controller.command.Command;
import controller.command.CommandFactory;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@WebServlet(urlPatterns = "/controller", loadOnStartup = 1)
public class FrontController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }


    private void processRequest(HttpServletRequest request, HttpServletResponse response) {
        Enumeration<String> attributeNames = request.getAttributeNames();
        List<String> attributeList = Collections.list(attributeNames);
        HashMap<String, String> attributes = new HashMap<>();
        String commandKey = null;
        for (String attributeName : attributeList) {
            if(attributeName.equals("command_name")) commandKey = (String) request.getAttribute(attributeName);
            else attributes.put(attributeName, (String) request.getAttribute(attributeName));
        }
        Command command = CommandFactory.getCommand(commandKey);
        try {
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(command.execute(attributes));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



}