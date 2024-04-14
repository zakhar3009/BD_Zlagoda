package dao.jdbc;

import dao.StoreProductDao;
import entity.StoreProduct;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class JdbcStoreProductDao implements StoreProductDao {

    private static String GET_ALL = "SELECT * FROM (store_product t1 INNER JOIN product ON t1.id_product = product.id_product)" +
            " LEFT JOIN store_product t2 ON t1.UPC_prom = t2.UPC";
    private static String GET_BY_ID = "SELECT * FROM store_product WHERE UPC=?";
    private static String CREATE = "INSERT INTO store_product" +
            " (UPC, UPC_prom, id_product, selling_price, products_number, promotional_product) VALUES (?, ?, ?, ?, ?, ?)";
    private static String UPDATE = "UPDATE store_product" +
            " SET UPC_prom=?, selling_price=?, products_number=?, promotional_product=?" + " WHERE UPC=?";
    private static String DELETE = "DELETE FROM store_product WHERE UPC=?";
    private static String GET_ALL_ORDER_BY_NAME = "SELECT * FROM (store_product t1 INNER JOIN product ON t1.id_product = product.id_product)" +
            " LEFT JOIN store_product t2 ON t1.UPC_prom = t2.UPC";


    private static String UPC = "UPC";
    private static String UPC_PROM = "UPC_prom";
    private static String PRODUCT_ID = "id_product";
    private static String PRODUCT_PRICE = "selling_price";
    private static String PRODUCT_QUANTITY = "products_number";
    private static String IS_PROM = "promotional_product";


    private Connection connection;

    public JdbcStoreProductDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<StoreProduct> getAll() {
        return null;
    }

    @Override
    public Optional<StoreProduct> getById(String id) {
        return Optional.empty();
    }

    @Override
    public void create(StoreProduct e) {

    }

    @Override
    public void update(StoreProduct e) {

    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<StoreProduct> getAllOrderByName() {
        return null;
    }

    @Override
    public Optional<StoreProduct> searchStoreProductByUpc(String upc) {
        return Optional.empty();
    }
}
