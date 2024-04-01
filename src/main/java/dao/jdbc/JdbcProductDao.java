package dao.jdbc;

import dao.ProductDao;
import entity.Product;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class JdbcProductDao implements ProductDao {

    private Connection connection;

    public JdbcProductDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<Product> getAll() {
        return null;
    }

    @Override
    public Optional<Product> getById(Integer id) {
        return Optional.empty();
    }

    @Override
    public void create(Product e) {

    }

    @Override
    public void update(Product e) {

    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public List<Product> getAllOrderByName() {
        return null;
    }

    @Override
    public List<Product> getAllOrderByQuantity() {
        return null;
    }

    @Override
    public List<Product> searchProductsByCategoryOrderByName(Integer categoryId) {
        return null;
    }

    @Override
    public List<Product> getPromProductsOrderByQuantity() {
        return null;
    }

    @Override
    public List<Product> getPromProductsOrderByName() {
        return null;
    }

    @Override
    public List<Product> getNonPromProductsOrderByQuantity() {
        return null;
    }

    @Override
    public List<Product> getNonPromProductsOrderByName() {
        return null;
    }

    @Override
    public List<Product> getAllByPartOfName(String partOfName) {
        return null;
    }
}
