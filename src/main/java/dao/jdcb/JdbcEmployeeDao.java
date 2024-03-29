package dao.jdcb;

import dao.EmployeeDao;
import entity.Employee;
import entity.Role;
import exception.ServerException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcEmployeeDao implements EmployeeDao {

    private static final Logger LOGGER = LogManager.getLogger(JdbcEmployeeDao.class);

    //
    private static String GET_ALL = "SELECT * FROM `Employee` ORDER BY empl_surname";


    // table columns names
    private static String ID = "id_employee";
    private static String NAME = "empl_name";
    private static String SURNAME = "empl_surname";
    private static String PATRONYMIC = "empl_patronymic";
    private static String SALARY = "salary";
    private static String DATA_OF_BIRTH = "data_of_birth";
    private static String DATA_OF_START= "data_of_start";
    private static String ROLE = "empl_role";
    private static String PHONE = "phone_number";
    private static String CITY = "city";
    private static String STREET = "street";
    private static String ZIP_CODE = "zip_code";


    private Connection connection;
    private boolean connectionShouldBeClosed;

    public JdbcEmployeeDao(Connection connection) {
        this.connection = connection;
        connectionShouldBeClosed = false;
    }

    public JdbcEmployeeDao(Connection connection, boolean connectionShouldBeClosed) {
        this.connection = connection;
        this.connectionShouldBeClosed = connectionShouldBeClosed;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }

    @Override
    public Optional<Employee> getEmployeeByCredentials(String email, String password) {
        return Optional.empty();
    }

    @Override
    public List<Employee> searchEmployeesBySurname(String surname) {
        return null;
    }

    @Override
    public List<Employee> searchEmployeesByRole(Role role) {
        return null;
    }

    @Override
    public Role getRole(String id) {
        return null;
    }

    @Override
    public void close() {

    }

    @Override
    public List<Employee> getAll() {
        List<Employee> users = new ArrayList<>();

        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)) {
            while (resultSet.next()) {
                users.add(extractUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            LOGGER.error("JdbcUserDao getAll SQL exception", e);
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
                .setRole(Role.valueOf(resultSet.getString(ROLE)))
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
