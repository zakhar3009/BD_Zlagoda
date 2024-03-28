package controller.command.commands.employee;

import controller.command.Command;
import service.EmployeeService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PostAddEmployeeCommand implements Command {

    private final EmployeeService employeeService;

    public PostAddEmployeeCommand(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        EmployeeDto userDto = getEmployeeInput(request);
        return null;
    }

}
