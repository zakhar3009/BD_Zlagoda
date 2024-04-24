package dao.jdbc;

import dao.CustomerDao;
import entity.CustomerCard;
import entity.Employee;
import exception.ServerException;

import java.sql.*;
import java.util.*;

public class JdbcCustomerDao implements CustomerDao {

    private static String GET_ALL = "SELECT * FROM customer_card";
    private static String GET_ALL_ORDER_BY_SURNAME = "SELECT * FROM customer_card ORDER BY cust_surname";
    private static String GET_BY_ID = "SELECT * FROM customer_card WHERE card_number=?";
    private static String CREATE = "INSERT INTO customer_card"
            + " (card_number, cust_surname, cust_name, cust_patronymic, phone_number, city, street, zip_code, percent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static String UPDATE = "Update customer_card"
            + " SET  cust_surname=?, cust_name=?, cust_patronymic=?, phone_number=?, city=?, street=?, zip_code=?, percent=?" + " WHERE card_number=? ";
    private static String DELETE = "DELETE FROM customer_card WHERE card_number=?";
    private static String SEARCH_CUSTOMERS_BY_PART_OF_SURNAME = "SELECT * FROM customer_card WHERE cust_surname LIKE ?";
    private static String GET_CUSTOMERS_BY_PERCENT_ORDER_BY_SURNAME = "SELECT * FROM customer_card WHERE percent=? ORDER BY cust_surname";
    private static String GET_CUSTOMERS_CHECKED_OUT_BY_CASHIERS = "SELECT customer_card.*,  employee.*" +
            "FROM customer_card JOIN checks USING (card_number) JOIN employee USING (id_employee)" +
            "WHERE " +
            "    NOT EXISTS ( " +
            "        SELECT * " +
            "        FROM employee " +
            "        WHERE " +
            "            employee.id_employee NOT IN (?))";

    private static String CUSTOMER_NUMBER = "card_number";
    private static String CUSTOMER_SURNAME = "cust_surname";
    private static String CUSTOMER_NAME = "cust_name";
    private static String CUSTOMER_PATRONYMIC = "cust_patronymic";
    private static String CUSTOMER_PHOME_NUMBER = "phone_number";
    private static String CUSTOMER_CITY = "city";
    private static String CUSTOMER_STREET = "street";
    private static String CUSTOMER_ZIP_CODE = "zip_code";
    private static String CUSTOMER_PERCENT = "percent";

    private Connection connection;

    public JdbcCustomerDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<CustomerCard> getAllOrderBySurname() {
        List<CustomerCard> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_SURNAME)) {
            while (resultSet.next()) {
                products.add(extractCustomerCardFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname) {
        List<CustomerCard> customerCards = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(SEARCH_CUSTOMERS_BY_PART_OF_SURNAME)) {
            query.setString(1, "%" + partOfSurname + "%");
            ResultSet resultSet = query.executeQuery();
            while (resultSet.next()) {
                customerCards.add(extractCustomerCardFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return customerCards;
    }

    @Override
    public List<CustomerCard> getCustomersByPercentOrderBySurname(int percent) {
        List<CustomerCard> customerCards = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(GET_CUSTOMERS_BY_PERCENT_ORDER_BY_SURNAME)) {
            query.setInt(1, percent);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                customerCards.add(extractCustomerCardFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return customerCards;
    }

    @Override
    public HashMap<CustomerCard, ArrayList<Employee>> getCustomerCheckedOutByCashiers(List<String> cashiers) {
        HashMap<CustomerCard, ArrayList<Employee>> result = new HashMap<>();
        try (PreparedStatement query = connection.prepareStatement(GET_CUSTOMERS_CHECKED_OUT_BY_CASHIERS)) {
            query.setString(1, String.join(", ", cashiers));
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next()) {
                result.computeIfAbsent(extractCustomerCardFromResultSet(resultSet), k -> new ArrayList<>()).add(JdbcEmployeeDao.extractUserFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return result;
    }

    @Override
    public List<CustomerCard> getAll() {
        List<CustomerCard> clients = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)) {
            while (resultSet.next()) {
                clients.add(extractCustomerCardFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return clients;
    }

    @Override
    public Optional<CustomerCard> getById(String id) {
        Optional<CustomerCard> customerCard = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setString(1, id);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                customerCard = Optional.of(extractCustomerCardFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return customerCard;
    }

    @Override
    public void create(CustomerCard customerCard) {
        String randomId = UUID.randomUUID().toString().substring(0, 10);
        try (PreparedStatement query = connection.prepareStatement(CREATE)){
            query.setString(1, randomId);
            query.setString(2, customerCard.getCustomerSurname());
            query.setString(3, customerCard.getCustomerName());
            query.setString(4, customerCard.getCustomerPatronymic());
            query.setString(5, customerCard.getPhoneNumber());
            query.setString(6, customerCard.getCity());
            query.setString(7, customerCard.getStreet());
            query.setString(8, customerCard.getZipCode());
            query.setInt(9, customerCard.getPercent());
            query.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void update(CustomerCard customerCard) {
        try (PreparedStatement query = connection.prepareStatement(UPDATE)){
            query.setString(1, customerCard.getCustomerSurname());
            query.setString(2, customerCard.getCustomerName());
            query.setString(3, customerCard.getCustomerPatronymic());
            query.setString(4, customerCard.getPhoneNumber());
            query.setString(5, customerCard.getCity());
            query.setString(6, customerCard.getStreet());
            query.setString(7, customerCard.getZipCode());
            query.setInt(8, customerCard.getPercent());
            query.setString(9, customerCard.getNumber());
            query.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void delete(String id) {
        try(PreparedStatement query = connection.prepareStatement(DELETE)){
            query.setString(1, id);
            query.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    protected static CustomerCard extractCustomerCardFromResultSet(ResultSet resultSet) throws SQLException {
        return new CustomerCard.Builder()
                .setNumber(resultSet.getString(CUSTOMER_NUMBER))
                .setCustomerSurname(resultSet.getString(CUSTOMER_SURNAME))
                .setCustomerName(resultSet.getString(CUSTOMER_NAME))
                .setPatronymic(resultSet.getString(CUSTOMER_PATRONYMIC))
                .setPhoneNumber(resultSet.getString(CUSTOMER_PHOME_NUMBER))
                .setCity(resultSet.getString(CUSTOMER_CITY))
                .setStreet(resultSet.getString(CUSTOMER_STREET))
                .setZipCode(resultSet.getString(CUSTOMER_ZIP_CODE))
                .setPercent(resultSet.getInt(CUSTOMER_PERCENT))
                .build();
    }
}
