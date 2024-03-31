package db_connection;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBFunctions {
    public static Connection connect_to_db(String db_name, String user, String admin) {
        Connection connection = null;
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5433/"+db_name, user, admin);
            if(connection != null) {
                System.out.println("Connection Established");
            } else {
                System.out.println("Connection Failed");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return connection;

    }

}
