package dao;


import dao.jdbc.JdbcDaoFactory;
import db_connection.DBFunctions;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.util.Properties;

public abstract class DaoFactory {

    public static final String DB_FILE = "/db.properties";
    private static final String DB_FACTORY_CLASS = "factory.class";

    private static DaoFactory daoFactory;

    public abstract Connection getConnection();

    public abstract EmployeeDao createEmployeeDao();

    public static DaoFactory getDaoFactory() {
        if (daoFactory == null) {
            try {
                InputStream inputStream = DaoFactory.class.getResourceAsStream(DB_FILE);
                Properties dbProps = new Properties();
                dbProps.load(inputStream);
                Connection connection = DBFunctions.connect_to_db(dbProps.getProperty("db_name"), dbProps.getProperty("user"), dbProps.getProperty("password"));
                daoFactory = new JdbcDaoFactory(connection);
            } catch (IOException e) {
                System.out.println(e);
            }
        }
        return daoFactory;
    }

}
