package dao.jdbc;

import dao.CategoryDao;
import entity.Category;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class JdbcCategoryDao implements CategoryDao {

    private Connection connection;

    public JdbcCategoryDao(Connection connection) {
        this.connection = connection;
    }


    private static String ID = "category_number";
    private String NAME = "category_name";



    @Override
    public List<Category> getAllOrderByName() {
        return null;
    }

    @Override
    public List<Category> getAll() {
        return null;
    }

    @Override
    public Optional<Category> getById(Integer id) {
        return Optional.empty();
    }

    @Override
    public void create(Category e) {

    }

    @Override
    public void update(Category e) {

    }

    @Override
    public void delete(Integer id) {

    }
}
