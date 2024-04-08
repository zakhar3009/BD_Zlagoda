package dao.jdbc;

import dao.CategoryDao;
import entity.Category;
import exception.ServerException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcCategoryDao implements CategoryDao {

    private static String GET_ALL = "SELECT * FROM category";
    private static String GET_ALL_ORDER_BY_NAME = "SELECT * FROM category ORDER BY category_name";
    private static String GET_BY_ID = "SELECT * FROM category WHERE category_number=?";
    private static String CREATE = "INSERT INTO category"
            + " (category_number, category_name) VALUES (?, ?)";
    private static String UPDATE = "UPDATE category"
            + " SET category_name=?" + " WHERE category_number=? ";
    private static String DELETE = "DELETE FROM category WHERE category_number=?";
    private Connection connection;
    public JdbcCategoryDao(Connection connection) {
        this.connection = connection;
    }
    private static String ID = "category_number";
    private static String NAME = "category_name";

    @Override
    public List<Category> getAllOrderByName() {
        List<Category> categories = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_NAME)) {
            while (resultSet.next()) {
                categories.add(extractCategoryFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return categories;
    }

    @Override
    public List<Category> getAll() {
        List<Category> categories = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)) {
            while (resultSet.next()) {
                categories.add(extractCategoryFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return categories;
    }

    @Override
    public Optional<Category> getById(Integer id) {
        Optional<Category> category = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setInt(1, id);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                category = Optional.of(extractCategoryFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return category;
    }

    @Override
    public void create(Category category) {
        try (PreparedStatement query = connection.prepareStatement(CREATE)) {
            query.setInt(1, category.getNumber());
            query.setString(2, category.getName());
            query.executeUpdate();
        } catch (SQLException err) {
            throw new ServerException(err);
        }
    }

    @Override
    public void update(Category c) {
        try (PreparedStatement query = connection.prepareStatement(UPDATE)) {
            query.setString(1, c.getName());
            query.setInt(2, c.getNumber());
            query.executeUpdate();
        } catch (SQLException e) {
            throw new ServerException(e);
        }
    }

    @Override
    public void delete(Integer id) {
        try (PreparedStatement query = connection.prepareStatement(DELETE)) {
            query.setInt(1, id);
            query.executeUpdate();
        } catch (SQLException e) {
            throw new ServerException(e);
        }
    }

    protected static Category extractCategoryFromResultSet(ResultSet resultSet) throws SQLException {

        return new Category.Builder()
                .setID(resultSet.getInt(ID))
                .setName(resultSet.getString(NAME))
                .build();
    }
}
