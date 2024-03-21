import db_connection.DBFunctions;

import java.sql.Connection;

public class Main {
    public static void main(String[] args) {
        DBFunctions db = new DBFunctions();
        Connection connection = db.connect_to_db("restaurant", "postgres", "admin");
        db.read_data(connection, "public.\"Products\"");
    }
}
