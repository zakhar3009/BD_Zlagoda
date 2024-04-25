package dao;

import entity.Employee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface EmployeeDao extends GenericDao<Employee, String> {
    Optional<Employee> getEmployeeByCredentials(String email, String password);
    List<Employee> getEmployeesOrderBySurname();
    List<Employee> getCashiersOrderBySurname();
    List<Employee> searchEmployeeAddressAndPhoneBySurname(String surname);
    ArrayList<HashMap<String, String>> getCashierChecksAndSalesReport();
    ArrayList<HashMap<String, String>> getTopEmployeesBySales();
}
