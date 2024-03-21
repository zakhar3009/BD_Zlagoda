package db_connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBFunctions {
    public Connection connect_to_db(String db_name, String user, String admin) {
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

    public void read_data(Connection connection, String table_name) {
        Statement statement;
        ResultSet rs = null;
        try {
            String query = String.format("SELECT * FROM %s", table_name);
            statement = connection.createStatement();
            rs = statement.executeQuery(query);
            while(rs.next()) {
                System.out.print(rs.getString("s_id") + " ");
                System.out.print(rs.getString("name") + " ");
                System.out.println(rs.getString("p_price") + " ");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
