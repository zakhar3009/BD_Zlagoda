package controller.command.commands.auth;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import dto.CredentialsDto;
import entity.Employee;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class PostLoginCommand implements Command {

    @Override
    public String execute(HttpServletRequest request) throws IOException {

        CredentialsDto credentialsDto = getUserInput(CommandFactory.getAttributes(request, HashMap.class));

        Optional<Employee> employee = employeeService.getUserByCredentials(credentialsDto);

        if(employee.isPresent()){
            SessionManager.getInstance().addUserToSession(request.getSession(), employee.get());
        }
        return employee.map(JSON.gson()::toJson).orElse(null);
    }

    private final EmployeeService employeeService;

    public PostLoginCommand(EmployeeService instance) {
        this.employeeService = instance;
    }

    private CredentialsDto getUserInput(HashMap<String, String> attributes) {
        return new CredentialsDto(attributes.get("email"), attributes.get("password"));
    }
}
