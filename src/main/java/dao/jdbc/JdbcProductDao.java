package dao.jdbc;

import dao.ProductDao;
import entity.Product;
import exception.ServerException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class JdbcProductDao implements ProductDao {

    private static String GET_ALL = "SELECT * FROM product JOIN category USING(category_number)";
    private static String GET_ALL_ORDER_BY_NAME = "SELECT * FROM product JOIN category USING(category_number) ORDER BY product_name";
    private static String GET_BY_ID = "SELECT * FROM product JOIN category USING(category_number) WHERE id_product=?";
    private static String CREATE = "INSERT INTO product"
            + " (id_product, category_number, product_name, characteristics) VALUES (?, ?, ?, ?)";
    private static String UPDATE = "UPDATE product"
            + " SET  category_number=?, product_name=?, characteristics=?" + " WHERE id_product=? ";
    private static String DELETE = "DELETE FROM product WHERE id_product=?";
    private static String GET_ALL_ORDER_BY_QUANTITY = "SELECT *" +
            "FROM (store_product INNER JOIN product ON product.id_product = store_product.id_product) JOIN category USING(category_number) " +
            "ORDER BY products_number ASC";

    private static String SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME = "SELECT *" +
            "FROM product JOIN category USING(category_number)" +
            "WHERE product.category_number IN (SELECT category_number" +
            "                          FROM category" +
            "                          WHERE category_name=?)";
    private static String GET_PROM_PRODUCT_ORDER_BY_QUANTITY = "SELECT *" +
            "FROM (product INNER JOIN store_product ON product.id_product = store_product.id_product) JOIN category USING(category_number) " +
            "WHERE promotional_product = TRUE " +
            "ORDER BY products_number ASC";

    private static String GET_PROM_PRODUCT_ORDER_BY_NAME = "SELECT *" +
            "FROM (product INNER JOIN store_product ON product.id_product = store_product.id_product) JOIN category USING(category_number) " +
            "WHERE promotional_product = TRUE " +
            "ORDER BY product_name ASC";

    private static String GET_NON_PROM_PRODUCT_ORDER_BY_QUANTITY = "SELECT *" +
            "FROM (product INNER JOIN store_product ON product.id_product = store_product.id_product) JOIN category USING(category_number) " +
            "WHERE promotional_product = FALSE " +
            "ORDER BY products_number ASC";

    private static String GET_NON_PROM_PRODUCT_ORDER_BY_NAME = "SELECT *" +
            "FROM (product INNER JOIN store_product ON product.id_product = store_product.id_product) JOIN category USING(category_number) " +
            "WHERE promotional_product = FALSE " +
            "ORDER BY product_name ASC";


    private static String GET_PRODUCT_BY_PART_OF_NAME = "SELECT * " +
            "FROM product JOIN category USING(category_number) " +
            "WHERE product_name LIKE ?";
    // table columns names
    private static String ID = "id_product";
    private static String CATEGORY_NUMBER = "category_number";
    private static String NAME = "product_name";
    private static String CHARACTERISTICS = "characteristics";

    private Connection connection;
    public JdbcProductDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<Product> getAll() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public Optional<Product> getById(Integer id) {
        Optional<Product> product = Optional.empty();
        try (PreparedStatement query = connection.prepareStatement(GET_BY_ID)) {
            query.setInt(1, id);
            ResultSet resultSet = query.executeQuery();
            while(resultSet.next())
                product = Optional.of(extractProductFromResultSet(resultSet));
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return product;
    }

    @Override
    public void create(Product product) {
        int randomId = UUID.randomUUID().toString().hashCode();
        try (PreparedStatement query = connection.prepareStatement(CREATE)) {
            query.setInt(1, randomId);
            query.setInt(2, product.getCategory().getNumber());
            query.setString(3, product.getName());
            query.setString(4, product.getCharacteristic());
            query.executeUpdate();
        } catch (SQLException err) {
            throw new ServerException(err);
        }
    }

    @Override
    public void update(Product product) {
        try (PreparedStatement query = connection.prepareStatement(UPDATE)) {
            query.setInt(1, product.getCategory().getNumber());
            query.setString(2, product.getName());
            query.setString(3, product.getCharacteristic());
            query.setInt(4, product.getId());
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

    @Override
    public List<Product> getAllOrderByName() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_NAME)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<Product> getAllOrderByQuantity() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_ALL_ORDER_BY_QUANTITY)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<Product> searchProductsByCategoryOrderByName(String categoryName) {
        List<Product> result = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(SEARCH_PRODUCTS_BY_CATEGORY_ORDER_BY_NAME)){
            query.setString(1, categoryName);
            ResultSet resultSet = query.executeQuery();
            while (resultSet.next()){
                result.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return result;
    }

    @Override
    public List<Product> getPromProductsOrderByQuantity() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_PROM_PRODUCT_ORDER_BY_QUANTITY)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<Product> getPromProductsOrderByName() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_PROM_PRODUCT_ORDER_BY_NAME)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<Product> getNonPromProductsOrderByQuantity() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_NON_PROM_PRODUCT_ORDER_BY_QUANTITY)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<Product> getNonPromProductsOrderByName() {
        List<Product> products = new ArrayList<>();
        try (Statement query = connection.createStatement(); ResultSet resultSet = query.executeQuery(GET_NON_PROM_PRODUCT_ORDER_BY_NAME)) {
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    @Override
    public List<Product> getAllByPartOfName(String partOfName) {
        List<Product> products = new ArrayList<>();
        try (PreparedStatement query = connection.prepareStatement(GET_PRODUCT_BY_PART_OF_NAME)) {
            query.setString(1, "%" + partOfName + "%");
            ResultSet resultSet = query.executeQuery();
            while (resultSet.next()) {
                products.add(extractProductFromResultSet(resultSet));
            }
        } catch (SQLException e) {
            throw new ServerException(e);
        }
        return products;
    }

    protected static Product extractProductFromResultSet(ResultSet resultSet) throws SQLException {

        return new Product.Builder()
                .setID(resultSet.getInt(ID))
                .setCategory(JdbcCategoryDao.extractCategoryFromResultSet(resultSet))
                .setName(resultSet.getString(NAME))
                .setCharacteristic(resultSet.getString(CHARACTERISTICS))
                .build();
    }
}
