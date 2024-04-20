package dao.jdbc;

import dao.StoreProductDao;
import entity.StoreProduct;
import exception.ServerException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class JdbcStoreProductDao implements StoreProductDao {

    private static String GET_ALL = "SELECT t1.*, t2.selling_price AS prom_selling_price, product.*, category.*" +
            " FROM ((store_product t1 INNER JOIN product ON t1.id_product = product.id_product)" +
            " INNER JOIN category ON product.category_number = category.category_number)" +
            " LEFT JOIN store_product t2 ON t1.UPC_prom = t2.UPC";
    private static String GET_BY_ID = "SELECT t1.*, t2.selling_price AS prom_selling_price, product.*, category.* " +
            " FROM ((store_product t1 INNER JOIN product ON t1.id_product = product.id_product)" +
            " INNER JOIN category ON product.category_number = category.category_number)" +
            " LEFT JOIN store_product t2 ON t1.UPC_prom = t2.UPC" +
            " WHERE t1.UPC=?";
    private static String CREATE = "INSERT INTO store_product" +
            " (UPC, UPC_prom, id_product, selling_price, products_number, promotional_product) VALUES (?, ?, ?, ?, ?, ?)";
    private static String UPDATE = "UPDATE store_product" +
            " SET UPC_prom=?, selling_price=?, products_number=?, promotional_product=?" + " WHERE UPC=?";
    private static String DELETE = "DELETE FROM store_product WHERE UPC=?";
    private static String GET_ALL_ORDER_BY_NAME = "SELECT t1.*, t2.selling_price AS prom_selling_price, product.*, category.*" +
            " FROM ((store_product t1 INNER JOIN product ON t1.id_product = product.id_product)" +
            " INNER JOIN category ON product.category_number = category.category_number)" +
            " LEFT JOIN store_product t2 ON t1.UPC_prom = t2.UPC";
    private static String GET_ALL_ORDER_BY_QUANTITY = "SELECT t1.*, t2.selling_price AS prom_selling_price, product.*, category.*" +
            " FROM ((store_product t1 INNER JOIN product ON t1.id_product = product.id_product)" +
            " INNER JOIN category ON product.category_number = category.category_number)" +
            " LEFT JOIN store_product t2 ON t1.UPC_prom = t2.UPC"+
            " ORDER BY t1.products_number ASC";
    private static String UPDATE_PROM_STORE_PRODUCT = "UPDATE store_product" +
            " SET selling_price=?, products_number=? " + " WHERE UPC=?";

    private static String UPC = "UPC";
    private static String UPC_PROM = "UPC_prom";
    private static String PRODUCT_ID = "id_product";
    private static String PRODUCT_PRICE = "selling_price";
    private static String PRODUCT_QUANTITY = "products_number";
    private static String IS_PROM = "promotional_product";
    private static String PROM_SELLING_PRICE = "prom_selling_price";


    private Connection connection;

    public JdbcStoreProductDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<StoreProduct> getAll() {
        List<StoreProduct> storeProducts = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)) {
            while (resultSet.next()) {
                storeProducts.add(extractStoreProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return storeProducts;
    }

    @Override
    public Optional<StoreProduct> getById(String id) {
        Optional<StoreProduct> storeProduct = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setString(1, id);
            ResultSet resultSet = query.executeQuery();
            while (resultSet.next())
                storeProduct = Optional.of(extractStoreProductFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return storeProduct;
    }

    @Override
    public void create(StoreProduct storeProduct) {
        String randomId = UUID.randomUUID().toString().substring(0, 12);
        try (PreparedStatement query = connection.prepareStatement(CREATE)) {
            query.setString(1, randomId);
            query.setString(2, storeProduct.getPromStoreProduct().getUPC());
            query.setInt(3, storeProduct.getProductID());
            query.setDouble(4, storeProduct.getSellingPrice());
            query.setInt(5, storeProduct.getProductsNumber());
            query.setBoolean(6, storeProduct.getPromotionalProduct());
            query.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void update(StoreProduct storeProduct) {
        try (PreparedStatement query = connection.prepareStatement(UPDATE)) {
            query.setString(1, storeProduct.getPromStoreProduct().getUPC());
            query.setDouble(2, storeProduct.getSellingPrice());
            query.setInt(3, storeProduct.getProductsNumber());
            query.setBoolean(4, storeProduct.getPromotionalProduct());
            query.setString(5, storeProduct.getUPC());
            query.executeUpdate();
            if(storeProduct.getPromStoreProduct().getUPC() != null) updatePromStoreProduct(storeProduct);
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }


    @Override
    public void delete(String id) {
        try (PreparedStatement query = connection.prepareStatement(DELETE)) {
            query.setString(1, id);
            query.executeUpdate();
        } catch (SQLException e) {
            throw new ServerException(e.getMessage(), e);
        }
    }

    @Override
    public List<StoreProduct> getAllOrderByName() {
        List<StoreProduct> storeProducts = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_NAME)) {
            while (resultSet.next()) {
                storeProducts.add(extractStoreProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return storeProducts;
    }
    @Override
    public List<StoreProduct> getAllOrderByQuantity() {
        List<StoreProduct> storeProducts = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_QUANTITY)) {
            while (resultSet.next()) {
                storeProducts.add(extractStoreProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return storeProducts;
    }

    private void updatePromStoreProduct(StoreProduct storeProduct){
        try (PreparedStatement query = connection.prepareStatement(UPDATE_PROM_STORE_PRODUCT)) {
            query.setDouble(1, storeProduct.getSellingPrice() * 0.8 );
            query.setDouble(2, storeProduct.getProductsNumber());
            query.setString(3, storeProduct.getPromStoreProduct().getUPC());
            query.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }


    @Override
    public void createPromStoreProduct(StoreProduct storeProduct) {
        String randomId = UUID.randomUUID().toString().substring(0, 12);
        storeProduct.setPromStoreProduct(new StoreProduct.Builder().setUpc(randomId).build());
        try (PreparedStatement query = connection.prepareStatement(CREATE)) {
            query.setString(1, storeProduct.getPromStoreProduct().getUPC());
            query.setString(2, null);
            query.setInt(3, storeProduct.getProductID());
            query.setDouble(4, storeProduct.getSellingPrice() * 0.8);
            query.setInt(5, storeProduct.getProductsNumber());
            query.setBoolean(6, true);
            query.executeUpdate();
            update(storeProduct);
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }


    protected static StoreProduct extractStoreProductFromResultSet(ResultSet resultSet) throws SQLException {

        return new StoreProduct.Builder()
                .setUpc(resultSet.getString(UPC))
                .setPromStoreProduct(resultSet.getString(UPC_PROM) == null ? null : extractPromStoreProductFromResultSet(resultSet))
                .setProduct(JdbcProductDao.extractProductFromResultSet(resultSet))
                .setSellingPrice(resultSet.getDouble(PRODUCT_PRICE))
                .setProductsNumber(resultSet.getInt(PRODUCT_QUANTITY))
                .setIsProm(resultSet.getBoolean(IS_PROM))
                .build();
    }

    protected static StoreProduct extractPromStoreProductFromResultSet(ResultSet resultSet) throws SQLException {

        return new StoreProduct.Builder()
                .setUpc(resultSet.getString(UPC_PROM))
                .setPromStoreProduct(null)
                .setProduct(JdbcProductDao.extractProductFromResultSet(resultSet))
                .setSellingPrice(resultSet.getDouble(PROM_SELLING_PRICE))
                .setProductsNumber(resultSet.getInt(PRODUCT_QUANTITY))
                .setIsProm(true)
                .build();
    }
}
