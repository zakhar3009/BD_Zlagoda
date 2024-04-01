package dao.jdbc;

import dao.*;

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

    @Override
    public CategoryDao createCategoryDao() { return new JdbcCategoryDao(this.connection); }

    @Override
    public CheckDao createCheckDao() { return new JdbcCheckDao(this.connection); }

    @Override
    public CustomerDao createCustomerDao() { return new JdbcCustomerDao(this.connection); }

    @Override
    public ProductDao createProductDao() { return new JdbcProductDao(this.connection); }

    @Override
    public SaleDao createSaleDao() { return new JdbcSaleDao(this.connection); }

    @Override
    public StoreProductDao createStoreProductDao() { return new JdbcStoreProductDao(this.connection); }
}
