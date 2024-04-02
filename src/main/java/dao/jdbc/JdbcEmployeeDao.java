package dao.jdbc;

import controller.Encryption;
import dao.EmployeeDao;
import entity.Employee;
import entity.Role;
import exception.ServerException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcEmployeeDao implements EmployeeDao {


    private static String GET_ALL= "SELECT * FROM employee ORDER BY empl_surname";
    private static String GET_CASHIERS = "SELECT * FROM employee WHERE empl_role=Cashier ORDER BY empl_surname";
    private static String GET_BY_CREDENTIALS = "SELECT * FROM employee WHERE email=? AND password=?";


    // table columns names

    private static String ID = "id_employee";
    private static String NAME = "empl_name";
    private static String SURNAME = "empl_surname";
    private static String PATRONYMIC = "empl_patronymic";
    private static String SALARY = "salary";
    private static String DATA_OF_BIRTH = "date_of_birth";
    private static String DATA_OF_START= "date_of_start";
    private static String ROLE = "empl_role";
    private static String PHONE = "phone_number";
    private static String CITY = "city";
    private static String STREET = "street";
    private static String ZIP_CODE = "zip_code";
    private static String EMAIL = "email";
    private static String PASSWORD = "password";


    private Connection connection;

    public JdbcEmployeeDao(Connection connection) {
        this.connection = connection;
    }
    public void setConnection(Connection connection) {
        this.connection = connection;
    }

    @Override
    public Optional<Employee> getEmployeeByCredentials(String email, String password) {
        Optional<Employee> user = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_CREDENTIALS)) {
            query.setString(1, email);
            query.setString(2, Encryption.hashPassword(password));
            ResultSet resultSet = query.executeQuery();
            while (resultSet.next()) {
                user = Optional.of(extractUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            
        }
        return user;
    }

    @Override
    public List<Employee> getEmployeesOrderBySurname() {
        return null;
    }

    @Override
    public List<Employee> getCashiersOrderBySurname() {
        return null;
    }

    @Override
    public Optional<Employee> searchEmployeeAddressAndPhoneBySurname(String surname) {
        return Optional.empty();
    }

    @Override
    public List<Employee> getAll() {
        List<Employee> users = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)) {
            while (resultSet.next()) {
                users.add(extractUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return users;
    }

    @Override
    public Optional<Employee> getById(String id) {
        return Optional.empty();
    }

    @Override
    public void create(Employee e) {

    }

    @Override
    public void update(Employee e) {

    }

    @Override
    public void delete(String id) {

    }

    protected static Employee extractUserFromResultSet(ResultSet resultSet) throws SQLException {

        return new Employee.Builder()
                .setRole(Role.getRole(resultSet.getString(ROLE)))
                .setSurname(resultSet.getString(SURNAME))
                .setName(resultSet.getString(NAME))
                .setCity(resultSet.getString(CITY))
                .setStreet(resultSet.getString(STREET))
                .setPhone(resultSet.getString(PHONE))
                .setDateOfBirth(resultSet.getDate(DATA_OF_BIRTH))
                .setDateOfStart(resultSet.getDate(DATA_OF_START))
                .setPatronymic(resultSet.getString(PATRONYMIC))
                .setSalary(resultSet.getDouble(SALARY))
                .setZipCode(resultSet.getString(ZIP_CODE))
                .build();
    }
}