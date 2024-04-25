package controller.command.commands.employee;

import controller.command.Command;
import controller.utils.JSON;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class GetTopEmployeesBySales implements Command {

    private final EmployeeService employeeService;

    public GetTopEmployeesBySales(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        ArrayList<HashMap<String, String>> hashMap = employeeService.getTopEmployeesBySales();
        return JSON.gson().toJson(hashMap);
    }
}
