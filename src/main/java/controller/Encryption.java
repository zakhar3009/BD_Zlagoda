package controller;
import org.mindrot.jbcrypt.BCrypt;

public class Encryption {
    private static String salt = "$2a$10$c7XAOdvq40jde1A5nUvJ3u";

    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, salt);
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

    public static void main(String[] args){
        String password = "12345678912";

        //String loginAttemptPassword = "54321";
        //System.out.println(hashPassword(password));
        System.out.println(hashPassword(password));
        System.out.println(hashPassword(password));

    }
}
