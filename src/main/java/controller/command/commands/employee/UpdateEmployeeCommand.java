package controller.command.commands.employee;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class UpdateEmployeeCommand implements Command {

    private final EmployeeService employeeService;

    public UpdateEmployeeCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Employee employee = CommandFactory.getAttributes(request, Employee.class);
        employeeService.updateEmployee(employee);
        return JSON.gson().toJson("");
    }
}
