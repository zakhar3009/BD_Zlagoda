package controller.command.commands.employee;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class GetEmployeeById implements Command {
    private final EmployeeService employeeService;

    public GetEmployeeById(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        Optional<Employee> employee = employeeService.getEmployeeById(hashMap.get("id_employee"));
        return employee.map(value -> JSON.gson().toJson(value)).orElse(null);
    }
}
