package controller.command.commands.employee;

import controller.command.Command;
import controller.utils.JSON;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class GetCashierChecksAndSalesReport implements Command {
    private final EmployeeService employeeService;

    public GetCashierChecksAndSalesReport(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        ArrayList<HashMap<String, String>> result = employeeService.getCashierChecksAndSalesReport();
        return JSON.gson().toJson(result);
    }
}
