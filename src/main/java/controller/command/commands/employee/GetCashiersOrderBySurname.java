package controller.command.commands.employee;

import controller.command.Command;
import controller.utils.JSON;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetCashiersOrderBySurname implements Command {
    private final EmployeeService employeeService;

    public GetCashiersOrderBySurname(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Employee> list = employeeService.getCashiersOrderBySurname();
        return JSON.gson().toJson(list);
    }
}
