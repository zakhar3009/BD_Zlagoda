package dao.jdbc;

import dao.CheckDao;
import entity.Check;
import exception.ServerException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcCheckDao implements CheckDao {

    private static String CREATE = "INSERT INTO checks" +
            " (check_number, id_employee, card_number, print_date, sum_total, vat) VALUES (?, ?, ?, ?, ?, ?)";
    private static String DELETE = "DELETE FROM checks WHERE check_number=?";
    private static String GET_ALL = "SELECT * FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number)";
    private static String GET_BY_ID = "SELECT * FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number) WHERE check_number=?";
    private static String GET_CHECKS_SUM_BY_EMPLOYEE_PER_PERIOD = "SELECT SUM(sum_total) FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number) WHERE (print_date>=? AND print_date<=?) AND id_employee=?";
    private static String GET_CHECKS_SUM_PER_PERIOD = "SELECT SUM(sum_total) FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number) WHERE print_date>=? AND print_date<=?";
    private static String GET_SElF_DAILY_CHECKS = "SELECT * FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number) WHERE id_employee=? AND print_date=?";
    private static String GET_SElF_CHECKS_PER_PERIOD = "SELECT * FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number) WHERE id_employee=? AND (print_date>? AND print_date<?)";
    private static String GET_ALL_CHECK_BY_CASHIER ="SELECT * FROM (checks JOIN employee USING(id_employee)) JOIN customer_card USING(card_number) WHERE id_employee=?";

    private static String CHECK_NUMBER = "check_number";
    private static String EMPLOYEE_ID = "id_employee";
    private static String CARD_NUMBER = "card_number";
    private static String PRINT_DATE = "print_date";
    private static String TOTAL_SUM = "sum_total";
    private static String VAT = "vat";

    private Connection connection;

    public JdbcCheckDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public double getChecksSumByEmployeeIdPerPeriod(String employeeId, Date start, Date end) {
        double totalSum = 0;
        try (PreparedStatement query = connection.prepareStatement(GET_CHECKS_SUM_BY_EMPLOYEE_PER_PERIOD)) {
            query.setDate(1, start);
            query.setDate(2, end);
            query.setString(3, employeeId);
            ResultSet resultSet = query.executeQuery();
            totalSum = Double.parseDouble(resultSet.getString(TOTAL_SUM));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return totalSum;
    }

    @Override
    public double getChecksSumByPeriod(Date start, Date end) {
        double totalSum = 0;
        try (PreparedStatement query = connection.prepareStatement(GET_CHECKS_SUM_PER_PERIOD)) {
            query.setDate(1, start);
            query.setDate(2, end);
            ResultSet resultSet = query.executeQuery();
            totalSum = resultSet.getDouble(TOTAL_SUM);
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return totalSum;
    }

    @Override
    public List<Check> getSelfDailyChecks(String employeeId, Date day) {
        List<Check> checks = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(GET_SElF_DAILY_CHECKS)) {
            query.setString(1, employeeId);
            query.setDate(2, day);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                checks.add(extractCheckFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return checks;
    }

    @Override
    public List<Check> getSelfChecksPerPeriod(String employeeId, Date start, Date end) {
        List<Check> checks = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(GET_SElF_CHECKS_PER_PERIOD)) {
            query.setString(1, employeeId);
            query.setDate(2, start);
            query.setDate(3, end);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                checks.add(extractCheckFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return checks;
    }

    @Override
    public List<Check> getAll() {
        List<Check> checks = new ArrayList<>();
        try(Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)){
            while (resultSet.next()){
                checks.add(extractCheckFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return checks;
    }

    @Override
    public Optional<Check> getById(String id) {
        Optional<Check> check = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setString(1, id);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                check = Optional.of(extractCheckFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return check;
    }

    @Override
    public void create(Check check) {

        try(PreparedStatement query = connection.prepareStatement(CREATE)){
            query.setString(1, check.getNumber());
            query.setString(2, check.getEmployee().getId());
            query.setString(3, check.getCustomerCard().getNumber());
            query.setDate(4, check.getPrintDate());
            query.setDouble(5, check.getSumTotal());
            query.setDouble(6, check.getVat());
            query.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public List<Check> getAllByCashier(String employeeId) {
        List<Check> check= new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(GET_ALL_CHECK_BY_CASHIER)) {
            query.setString(1, employeeId);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                check.add(extractCheckFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return check;
    }
    @Override
    public void update(Check e) {

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

    protected static Check extractCheckFromResultSet(ResultSet resultSet) throws SQLException {

        return new Check.Builder().setNumber(resultSet.getString(CHECK_NUMBER))
                .setEmployee(JdbcEmployeeDao.extractUserFromResultSet(resultSet))
                .setCustomerCard(JdbcCustomerDao.extractCustomerCardFromResultSet(resultSet))
                .setPrintDate(resultSet.getDate(PRINT_DATE))
                .setTotalSum(resultSet.getDouble(TOTAL_SUM))
                .setVat(resultSet.getDouble(VAT))
                .build();
    }


}
