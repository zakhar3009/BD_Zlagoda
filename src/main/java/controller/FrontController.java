package controller;

import com.google.gson.Gson;
import controller.command.Command;
import controller.command.CommandFactory;
import controller.utils.CommandKeyGenerator;
import controller.utils.HttpWrapper;
import entity.Employee;
import entity.Role;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@WebServlet(urlPatterns = "/controller", loadOnStartup = 1)
public class FrontController extends HttpServlet {

    private Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Employee employee = new Employee(
                "EMP001",
                "Doe",
                "John",
                "Smith",
                Role.getRole("Manager"),
                5000.00,
                new Date(90, 5, 15), // Дата народження (рік, місяць, день)
                new Date(122, 0, 1), // Дата початку роботи (рік, місяць, день)
                "1234567890",
                "New York",
                "Main Street",
                "12345"
        );
        String employeeJsonString = this.gson.toJson(employee);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        out.print(employeeJsonString);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }


    private void processRequest(HttpServletRequest request, HttpServletResponse response) {
        HttpWrapper httpWrapper = new HttpWrapper(request, response);
        String commandKey = CommandKeyGenerator.generateCommandKeyFromRequest(request);
        Command command = CommandFactory.getCommand(commandKey);
        try {
            String commandResultedResource = command.execute(request, response);
            forwardToCommandResultedPage(httpWrapper, commandResultedResource);
        } catch (Exception e) {

        }
    }

    private void forwardToCommandResultedPage(HttpWrapper httpWrapper, String resultedRedirectResource)
        throws ServletException, IOException {
//        if(!resultedRedirectResource.contains(RedirectionManager.REDIRECTION)) {
            httpWrapper.getRequest().getRequestDispatcher(resultedRedirectResource)
                    .forward(httpWrapper.getRequest(), httpWrapper.getResponse());
//        }
    }


}