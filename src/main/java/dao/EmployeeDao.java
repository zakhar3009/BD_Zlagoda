package dao;

import entity.Employee;
import entity.Role;

import java.util.List;
import java.util.Optional;

public interface EmployeeDao extends GenericDao<Employee, String> {
    Optional<Employee> getEmployeeByCredentials(String email, String password);

    List<Employee> searchEmployeesBySurname(String surname);

    List<Employee> searchEmployeesByRole(Role role);
    Role getRole(String id);
//    List<Employee> searchBestWaitersPerPeriod(LocalDate fromDate, LocalDate toDate);

}
