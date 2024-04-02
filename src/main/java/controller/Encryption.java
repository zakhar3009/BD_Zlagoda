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
        String loginAttemptPassword = "54321";
        System.out.println(hashPassword(password));
//        $2a$10$rf1e.T8cR40y9Tz0MsKdr.IGrtgsftn3H.n2E4yCWBAMYYNFD9axu
    }
}
