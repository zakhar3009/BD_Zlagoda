package dao.jdbc;

import dao.CheckDao;
import entity.Check;

import java.sql.Connection;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class JdbcCheckDao implements CheckDao {

    private Connection connection;

    public JdbcCheckDao(Connection connection) {
        this.connection = connection;
    }

    @Override
    public double getChecksSumByEmployeeIdPerPeriod(String employeeId, LocalDate start, LocalDate end) {
        return 0;
    }

    @Override
    public double getChecksSumByPeriod(LocalDate start, LocalDate end) {
        return 0;
    }

    @Override
    public List<Check> getSelfDailyChecks(String employeeId, LocalDate day) {
        return null;
    }

    @Override
    public List<Check> getSelfChecksPerPeriod(String employeeId, LocalDate start, LocalDate end) {
        return null;
    }

    @Override
    public List<Check> getAll() {
        return null;
    }

    @Override
    public Optional<Check> getById(String id) {
        return Optional.empty();
    }

    @Override
    public void create(Check e) {

    }

    @Override
    public void update(Check e) {

    }

    @Override
    public void delete(String id) {

    }
}
