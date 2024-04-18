//package controller.filter;
//
//import com.google.gson.Gson;
//import controller.command.commands.CashierCommands;
//import controller.command.commands.ManagerCommands;
//import controller.command.commands.auth.SessionManager;
//import controller.utils.HttpWrapper;
//import controller.utils.JSON;
//import entity.Employee;
//import entity.Role;
//
//import javax.servlet.*;
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.HashMap;
//import java.util.Map;
//
//@WebFilter(urlPatterns = {"/controller/*"})
//public class UrlUnauthorizedAccessFilter implements Filter {
//
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {}
//
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
//            throws IOException, ServletException {
//        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
//        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
//
//        Employee user = SessionManager.getInstance().getUserFromSession(httpRequest.getSession());
//
//        if (!isUserRegistered(user) || !isUserAuthorizedForResource(httpRequest, user)) {
//            Map<String, String> errors = new HashMap<>();
//            errors.put("error", "shop.error.authorizedAccessError");
//            PrintWriter out = httpResponse.getWriter();
//            httpResponse.setStatus(401);
//            httpResponse.setHeader("Access-Control-Allow-Origin", "*");
//            httpResponse.setContentType("application/json");
//            httpResponse.setCharacterEncoding("UTF-8");
//            out.print(JSON.gson().toJson(errors));
//            out.flush();
//            return;
//        }
//
//        filterChain.doFilter(servletRequest, servletResponse);
//    }
//
//    @Override
//    public void destroy() {
//    }
//
//    private boolean isUserRegistered(Employee user) {
//        return user != null;
//    }
//
//    private boolean isUserAuthorizedForResource(HttpServletRequest httpRequest, Employee user) {
//        Role userRole = user.getRole();
//        String command = null;
//
//        if (httpRequest.getMethod().equals("GET")) {
//            command = httpRequest.getParameter("command_name");
//        } else if (httpRequest.getMethod().equals("POST") || httpRequest.getMethod().equals("DELETE")) {
//            command = httpRequest.getHeader("command_name");
//        }
//
//        try {
//            if (userRole.equals(Role.MANAGER)) {
//                ManagerCommands.valueOf(command);
//            } else {
//                CashierCommands.valueOf(command);
//            }
//        } catch (IllegalArgumentException ex) {
//            return false;
//        }
//
//        return true;
//    }
//}
//
