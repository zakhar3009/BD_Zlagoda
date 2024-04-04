package dao;

import entity.Employee;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface EmployeeDao extends GenericDao<Employee, String> {
    Optional<Employee> getEmployeeByCredentials(String email, String password);
    List<Employee> getEmployeesOrderBySurname();
    List<Employee> getCashiersOrderBySurname();
    HashMap<String, String> searchEmployeeAddressAndPhoneBySurname(String surname);

}
