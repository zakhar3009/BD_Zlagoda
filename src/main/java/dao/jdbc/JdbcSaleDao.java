package dao.jdbc;

import dao.SaleDao;
import entity.Sale;

import java.sql.Connection;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class JdbcSaleDao implements SaleDao {

    private Connection connection;

    public JdbcSaleDao(Connection connection) {
        this.connection = connection;
    }
    @Override
    public List<Sale> getAll() {
        return null;
    }

    @Override
    public Optional<Sale> getById(List<String> id) {
        return Optional.empty();
    }

    @Override
    public void create(Sale e) {

    }

    @Override
    public void update(Sale e) {

    }

    @Override
    public void delete(List<String> id) {

    }

    @Override
    public List<List<Sale>> getFullChecksByEmployeeIdPerPeriod(String employeeId, LocalDate start, LocalDate end) {
        return null;
    }

    @Override
    public List<List<Sale>> getFullChecksPerPeriod(LocalDate start, LocalDate end) {
        return null;
    }

    @Override
    public int getQuantityOfSoldProductPerPeriod(LocalDate start, LocalDate end) {
        return 0;
    }

    @Override
    public List<Sale> getFullCheckByNumber(String checkNumber) {
        return null;
    }
}
