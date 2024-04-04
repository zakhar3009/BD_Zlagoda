package controller.command.commands.employee;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteEmployeeCommand implements Command {

    private final EmployeeService employeeService;

    public DeleteEmployeeCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> attributes = CommandFactory.getAttributes(request, HashMap.class);
        employeeService.deleteEmployee(attributes.get("id"));
        return JSON.gson().toJson(true);
    }
}
