package controller.command.commands.auth;

import entity.Employee;

import javax.servlet.http.HttpSession;

public class SessionManager {

    private SessionManager() {
    }

    private static final SessionManager INSTANCE = new SessionManager();

    public static SessionManager getInstance() {
        return INSTANCE;
    }

    public boolean isUserLoggedIn(HttpSession session) {
        return session.getAttribute("user") != null;
    }

    public void addUserToSession(HttpSession session, Employee employee) {
        session.setAttribute("user", employee);
    }

    public Employee getUserFromSession(HttpSession session) {
        return (Employee) session.getAttribute("user");
    }

    public void invalidateSession(HttpSession session) {
        if(session != null && session.getAttribute("user") != null)
            session.invalidate();
    }

}
