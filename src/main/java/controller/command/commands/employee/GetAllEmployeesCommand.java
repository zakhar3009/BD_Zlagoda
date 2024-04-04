package controller.command.commands.employee;

import controller.command.Command;
import controller.utils.JSON;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllEmployeesCommand implements Command {

    private final EmployeeService employeeService;

    public GetAllEmployeesCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Employee> list = employeeService.getAllEmployees();
        return JSON.gson().toJson(list);
    }
}
