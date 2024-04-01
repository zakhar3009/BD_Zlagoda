package dao.jdbc;

import dao.CustomerDao;
import entity.CustomerCard;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class JdbcCustomerDao implements CustomerDao {

    private Connection connection;

    public JdbcCustomerDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<CustomerCard> getAllOrderBySurname() {
        return null;
    }

    @Override
    public List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname) {
        return null;
    }

    @Override
    public List<CustomerCard> getAll() {
        return null;
    }

    @Override
    public Optional<CustomerCard> getById(String id) {
        return Optional.empty();
    }

    @Override
    public void create(CustomerCard e) {

    }

    @Override
    public void update(CustomerCard e) {

    }

    @Override
    public void delete(String id) {

    }
}
