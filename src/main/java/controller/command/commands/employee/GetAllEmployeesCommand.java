package controller.command.commands.employee;

import com.google.gson.Gson;
import controller.command.Command;
import entity.Employee;
import service.EmployeeService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class GetAllEmployeesCommand implements Command {
    private Gson gson = new Gson();

    private final EmployeeService employeeService;

    public GetAllEmployeesCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HashMap<String, String> attributes) throws IOException {
        List<Employee> list = employeeService.getAllEmployees();
        return this.gson.toJson(list);
    }
}
