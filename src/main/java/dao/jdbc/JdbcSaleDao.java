package dao.jdbc;

import dao.SaleDao;
import entity.Sale;
import exception.ServerException;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class JdbcSaleDao implements SaleDao {

    private static String CREATE = "INSERT INTO sale" +
            " (UPC, check_number, product_number, selling_price) VALUES (?, ?, ?, ?)";
    private static String DELETE = "DELETE FROM sale WHERE UPC=? AND check_number=?";
    private static String GET_BY_ID = "SELECT * FROM ((sale JOIN store_product USING(UPC)) JOIN checks USING(check_number)) WHERE UPC=? AND check_number=?";
    private static String GET_ALL = "SELECT * FROM ((sale JOIN store_product USING(UPC)) JOIN checks USING(check_number))";
    private static String GET_QUANTITY_OF_SOLD_PRODUCT_PER_PERIOD = "SELECT SUM(product_number) FROM ((sale JOIN store_product USING(UPC)) JOIN checks USING(check_number)) JOIN checks USING(check_number)" +
            " WHERE UPC=? AND (print_date>=? AND print_date<=?)";
    private static String GET_FULL_CHECK_BY_NUMBER = "SELECT * FROM ((sale JOIN store_product USING(UPC)) )";

    private static String UPC = "UPC";
    private static String CHECK_NUMBER = "check_number";
    private static String PRODUCT_NUMBER = "product_number";
    private static String SELLING_PRICE = "selling_price";

    private Connection connection;

    public JdbcSaleDao(Connection connection) {
        this.connection = connection;
    }
    @Override
    public List<Sale> getAll() {
        List<Sale> sales = new ArrayList<>();
        try(Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)){
            while (resultSet.next()){
                sales.add(extractSaleFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return sales;
    }

    @Override
    public Optional<Sale> getById(HashMap<String, String> id) {
        Optional<Sale> sale = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setString(1, id.get("UPC"));
            query.setString(2, id.get("check_number"));
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                sale = Optional.of(extractSaleFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return sale;
    }

    @Override
    public void create(Sale sale) {
        try(PreparedStatement query = connection.prepareStatement(CREATE)){
            query.setString(1, sale.getStoreProduct().getUPC());
            query.setString(2, sale.getCheck().getNumber());
            query.setInt(3, sale.getProductNumber());
            query.setDouble(4, sale.getSellingPrice());
            query.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void update(Sale e) {

    }

    @Override
    public void delete(HashMap<String, String> id) {
        try (PreparedStatement query = connection.prepareStatement(DELETE)) {
            query.setString(1, id.get("UPC"));
            query.setString(2, id.get("check_number"));
            query.executeUpdate();
        } catch (SQLException e) {
            throw new ServerException(e);
        }
    }

    @Override
    public List<List<Sale>> getFullChecksByEmployeeIdPerPeriod(String employeeId, Date start, Date end) {
        return null;
    }

    @Override
    public List<List<Sale>> getFullChecksPerPeriod(Date start, Date end) {
        return null;
    }

    @Override
    public int getQuantityOfSoldProductPerPeriod(String UPC, Date start, Date end) {
        int quantity = 0;
        try (PreparedStatement query = connection.prepareStatement(GET_QUANTITY_OF_SOLD_PRODUCT_PER_PERIOD)) {
            query.setString(1, UPC);
            query.setDate(2, start);
            query.setDate(3, end);
            ResultSet resultSet = query.executeQuery();
            quantity = resultSet.getInt(PRODUCT_NUMBER);
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return quantity;
    }

    @Override
    public List<Sale> getFullCheckByNumber(String checkNumber) {
        return null;
    }

    protected static Sale extractSaleFromResultSet(ResultSet resultSet) throws SQLException {

        return new Sale.Builder().setStoreProduct(JdbcStoreProductDao.extractStoreProductFromResultSet(resultSet))
                .setCheck(JdbcCheckDao.extractCheckFromResultSet(resultSet))
                .setProductNumber(resultSet.getInt(PRODUCT_NUMBER))
                .setSellingPrice(resultSet.getDouble(SELLING_PRICE))
                .build();
    }
}
