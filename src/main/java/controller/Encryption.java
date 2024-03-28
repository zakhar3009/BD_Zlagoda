package controller;
import org.mindrot.jbcrypt.BCrypt;

public class Encryption {
    private static String salt;

    public static String hashPassword(String password) {
        if (salt == null) salt = BCrypt.gensalt();
        return BCrypt.hashpw(password, salt);
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

    public static void main(String[] args){
        String password = "12345";
        String loginAttemptPassword = "12345";
        System.out.println("Password Match: " +  checkPassword(password, hashPassword(loginAttemptPassword)));
    }
}
