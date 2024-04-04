package controller.command.commands.employee;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class GetAllEmployeeOrderBySurname implements Command {
    private final EmployeeService employeeService;

    public GetAllEmployeeOrderBySurname(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Employee> list = employeeService.getEmployeesOrderBySurname();
        return JSON.gson().toJson(list);
    }
}
