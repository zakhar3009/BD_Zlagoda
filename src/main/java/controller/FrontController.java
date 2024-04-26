package controller;


import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.command.commands.auth.SessionManager;
import entity.Employee;
import entity.Role;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

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

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) {
        Command command;
        String commandName = request.getHeader("command_name");
        if(commandName != null && commandName.equals("POST_LOGIN")) {
            command = CommandFactory.getManagerCommand(request);
        } else {
            Employee user = SessionManager.getInstance().getUserFromSession();
            Role userRole = user.getRole();
            if (userRole.equals(Role.MANAGER)) command = CommandFactory.getManagerCommand(request);
            else command = CommandFactory.getCashierCommand(request);
        }
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