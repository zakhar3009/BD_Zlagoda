package controller.utils;

import javax.servlet.http.HttpServletRequest;

public class CommandKeyGenerator {
    private static String CONTROLLER_PATH = ".*/controller/";
    private static String REPLACEMENT = "";
    private static String DELIMITER = ":";

    private CommandKeyGenerator() {
    }

    public static String generateCommandKeyFromRequest(HttpServletRequest request) {
        String method = request.getMethod().toUpperCase();
        String path = request.getRequestURI().replaceAll(CONTROLLER_PATH, REPLACEMENT);
        String key = method + DELIMITER + path;
        return key;
    }
}
