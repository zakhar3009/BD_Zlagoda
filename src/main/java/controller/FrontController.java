package controller;


import controller.command.Command;
import controller.command.commands.CommandFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

@WebServlet(urlPatterns = "/controller", loadOnStartup = 1)
public class FrontController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
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
//        String commandKey = null;
//        for (String attributeName : attributeList) {
//            if(attributeName.equals("command_name")) commandKey = (String) request.getAttribute(attributeName);
//            else attributes.put(attributeName, (String) request.getAttribute(attributeName));
//        }
        String commandKey = request.getParameter("command_name");
        Command command = CommandFactory.getManagerCommand(request);
        try {
            PrintWriter out = response.getWriter();
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(command.execute(request));
            out.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



}