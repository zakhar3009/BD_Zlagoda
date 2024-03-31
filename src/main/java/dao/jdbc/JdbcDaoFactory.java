package dao.jdbc;

import dao.DaoFactory;
import dao.EmployeeDao;
import java.sql.Connection;


public class JdbcDaoFactory extends DaoFactory {

    private Connection connection;

    public JdbcDaoFactory(Connection connection) {
        this.connection = connection;
    }

    @Override
    public Connection getConnection() {
        return this.connection;
    }

    @Override
    public EmployeeDao createEmployeeDao() {
        return new JdbcEmployeeDao(this.connection);
    }
}
