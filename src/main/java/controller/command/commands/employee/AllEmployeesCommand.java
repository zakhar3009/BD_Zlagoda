package controller.command.commands.employee;

import com.google.gson.Gson;
import controller.command.Command;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class AllEmployeesCommand implements Command {

    private final EmployeeService employeeService;
    private Gson gson = new Gson();

    public AllEmployeesCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Employee> employees = employeeService.getAllEmployees();

        String employeeJsonString = this.gson.toJson(employees);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        out.print(employeeJsonString);
        out.flush();
//        request.setAttribute("employees", employees);
//        request.setAttribute(Attribute.ROLES, Role.values());
        return null;
    }
}
