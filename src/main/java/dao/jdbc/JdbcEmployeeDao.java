package dao.jdbc;

import controller.Encryption;
import dao.EmployeeDao;
import entity.Employee;
import entity.Role;
import exception.ServerException;

import java.sql.*;
import java.util.*;


public class JdbcEmployeeDao implements EmployeeDao {


    private static String GET_ALL= "SELECT * FROM employee";
    private static String GET_ALL_ORDER_BY_SURNAME = "SELECT * FROM employee ORDER BY empl_surname";
    private static String GET_CASHIERS_ORDER_BY_SURNAME = "SELECT * FROM employee WHERE empl_role='Cashier' ORDER BY empl_surname";
    private static String GET_BY_CREDENTIALS = "SELECT * FROM employee WHERE email=? AND password=?";
    private static String GET_BY_ID = "SELECT * FROM employee WHERE id_employee=?";
    private static String CREATE = "INSERT INTO employee"
            + " (email, password, id_employee, empl_name, empl_surname, empl_patronymic, empl_role, salary, date_of_birth, date_of_start, phone_number, city, street, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static String UPDATE = "UPDATE employee"
            + " SET email=?, password=?, empl_name=?, empl_surname=?, empl_patronymic=?, empl_role=?, salary=?, date_of_birth=?, date_of_start=?, phone_number=?, city=?, street=?, zip_code=?" + " WHERE id_employee=? ";
    private static String DELETE = "DELETE FROM employee WHERE id_employee=?";
    private static String SEARCH_ADDRESS_AND_PHONE_BY_SURNAME = "SELECT street, phone_number, city, empl_surname FROM employee WHERE empl_surname=?";
    private static String GET_CASHIERS_CHECK_AND_SALES_REPORT = "SELECT employee.empl_surname, employee.empl_name, COUNT(checks.check_number) AS checks_number, COUNT(sale.check_number) AS products_number " +
            " FROM employee LEFT JOIN checks ON employee.id_employee = checks.id_employee " +
            " LEFT JOIN sale ON checks.check_number = sale.check_number" +
            " GROUP BY employee.id_employee, employee.empl_surname, employee.empl_name " +
            " ORDER BY checks_number DESC";

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
        List<Employee> employees = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_SURNAME)) {
            while (resultSet.next()) {
                employees.add(extractUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return employees;
    }

    @Override
    public List<Employee> getCashiersOrderBySurname() {
        List<Employee> employees = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_CASHIERS_ORDER_BY_SURNAME)) {
            while (resultSet.next()) {
                employees.add(extractUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return employees;
    }

    @Override
    public List<Employee> searchEmployeeAddressAndPhoneBySurname(String surname) {
        List<Employee> result = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(SEARCH_ADDRESS_AND_PHONE_BY_SURNAME)){
            query.setString(1, surname);
            ResultSet resultSet = query.executeQuery();
            while (resultSet.next()){
                result.add(extractAddressAndPhoneUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return result;
    }

    @Override
    public HashMap<String, String> getCashierChecksAndSalesReport() {
        HashMap<String, String> result = new HashMap<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_CASHIERS_CHECK_AND_SALES_REPORT)) {
            while (resultSet.next()) {
                result.put(SURNAME, result.get(SURNAME));
                result.put(NAME, result.get(NAME));
                result.put("checks_number", result.get("checks_number"));
                result.put("products_number", result.get("products_number"));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return result;
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
        Optional<Employee> employee = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setString(1, id);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                employee = Optional.of(extractUserFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return employee;
    }
    
    @Override
    public void create(Employee employee) {
        String randomId = UUID.randomUUID().toString().substring(0, 10);
        try (PreparedStatement query = connection.prepareStatement(CREATE)) {
            query.setString(1, employee.getEmail());
            query.setString(2, Encryption.hashPassword(employee.getPassword()));
            query.setString(3, randomId);
            query.setString(4, employee.getName());
            query.setString(5, employee.getSurname());
            query.setString(6, employee.getPatronymic());
            query.setString(7, employee.getRole().getRole());
            query.setDouble(8, employee.getSalary());
            query.setDate(9, employee.getDateOfBirth());
            query.setDate(10, employee.getDateOfStart());
            query.setString(11, employee.getPhoneNumber());
            query.setString(12, employee.getCity());
            query.setString(13, employee.getStreet());
            query.setString(14, employee.getZipCode());
            query.executeUpdate();
        } catch (SQLException err) {
            throw new ServerException(err);
        }
    }

    @Override
    public void update(Employee employee) {
        try (PreparedStatement query = connection.prepareStatement(UPDATE)) {
            query.setString(1, employee.getEmail());
            query.setString(2, Encryption.hashPassword(employee.getPassword()));
            query.setString(3, employee.getName());
            query.setString(4, employee.getSurname());
            query.setString(5, employee.getPatronymic());
            query.setString(6, employee.getRole().getRole());
            query.setDouble(7, employee.getSalary());
            query.setDate(8, employee.getDateOfBirth());
            query.setDate(9, employee.getDateOfStart());
            query.setString(10, employee.getPhoneNumber());
            query.setString(11, employee.getCity());
            query.setString(12, employee.getStreet());
            query.setString(13, employee.getZipCode());
            query.setString(14, employee.getId());
            query.executeUpdate();
        } catch (SQLException e) {
            throw new ServerException(e);
        }        
    }

    @Override
    public void delete(String id) {
        try (PreparedStatement query = connection.prepareStatement(DELETE)) {
            query.setString(1, id);
            query.executeUpdate();
        } catch (SQLException e) {
            throw new ServerException(e);
        }
    }

    protected static Employee extractUserFromResultSet(ResultSet resultSet) throws SQLException {

        return new Employee.Builder()
                .setId(resultSet.getString(ID))
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
                .setEmail(resultSet.getString(EMAIL))
                .build();
    }




    protected static Employee extractAddressAndPhoneUserFromResultSet(ResultSet resultSet) throws SQLException {

        return new Employee.Builder()
                .setSurname(resultSet.getString(SURNAME))
                .setCity(resultSet.getString(CITY))
                .setStreet(resultSet.getString(STREET))
                .setPhone(resultSet.getString(PHONE))
                .build();
    }
}
