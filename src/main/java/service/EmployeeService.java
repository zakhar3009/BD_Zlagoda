package service;

import dao.DaoFactory;
import dao.EmployeeDao;
import dto.CredentialsDto;
import entity.Employee;

import java.util.List;
import java.util.Optional;

public class EmployeeService {

    private final DaoFactory daoFactory;

    private EmployeeService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final EmployeeService INSTANCE = new EmployeeService(DaoFactory.getDaoFactory());

    public static EmployeeService getInstance() {
        return INSTANCE;
    }

    public List<Employee> getAllEmployees() {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        return employeeDao.getAll();
    }

    public Optional<Employee> getEmployeeById(String employeeId) {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        return employeeDao.getById(employeeId);
    }

    public Optional<Employee> getUserByCredentials(CredentialsDto credentialsDto) {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        return employeeDao.getEmployeeByCredentials(credentialsDto.getEmail(), credentialsDto.getPassword());
    }

    public void createEmployee(Employee employee) {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        employeeDao.create(employee);
    }

    public void updateEmployee(Employee employee) {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        employeeDao.update(employee);
    }

    public void deleteEmployee(String employeeId) {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        employeeDao.delete(employeeId);
    }

    public List<Employee> getEmployeesOrderBySurname() {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        return employeeDao.getEmployeesOrderBySurname();
    }

    public List<Employee> getCashiersOrderBySurname() {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        return employeeDao.getCashiersOrderBySurname();
    }

    public Optional<Employee> searchEmployeeAddressAndPhoneBySurname(String surname) {
        EmployeeDao employeeDao = daoFactory.createEmployeeDao();
        return employeeDao.searchEmployeeAddressAndPhoneBySurname(surname);
    }


}
