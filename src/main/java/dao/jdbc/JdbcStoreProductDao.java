package dao.jdbc;

import dao.StoreProductDao;
import entity.StoreProduct;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class JdbcStoreProductDao implements StoreProductDao {

    private Connection connection;

    public JdbcStoreProductDao(Connection connection) {
        this.connection = connection;
    }
    @Override
    public List<StoreProductDao> getAll() {
        return null;
    }

    @Override
    public Optional<StoreProductDao> getById(String id) {
        return Optional.empty();
    }

    @Override
    public void create(StoreProductDao e) {

    }

    @Override
    public void update(StoreProductDao e) {

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
