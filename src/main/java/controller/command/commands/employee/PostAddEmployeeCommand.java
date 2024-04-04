package controller.command.commands.employee;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class PostAddEmployeeCommand implements Command {

    private final EmployeeService employeeService;

    public PostAddEmployeeCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Employee employee = CommandFactory.getAttributes(request, Employee.class);
        employeeService.createEmployee(employee);
        return JSON.gson().toJson("");
    }
}
