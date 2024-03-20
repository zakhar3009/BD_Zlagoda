package controller;

import controller.command.Command;
import controller.command.CommandFactory;
import controller.utils.CommandKeyGenerator;
import controller.utils.HttpWrapper;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(urlPatterns = "/controller/*", loadOnStartup = 1)
public class FrontController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //getServletContext().getRequestDispatcher("/WEB-INF/views/errors/pageNotFound.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }


    private void processRequest(HttpServletRequest request, HttpServletResponse response) {
        HttpWrapper httpWrapper = new HttpWrapper(request, response);
        String commandKey = CommandKeyGenerator.generateCommandKeyFromRequest(request);
        Command command = CommandFactory.getCommand(commandKey);
        try {
            String commandResultedResource = command.execute(request, response);
            forwardToCommandResultedPage(httpWrapper, commandResultedResource);
        } catch (Exception e) {

        }
    }

    private void forwardToCommandResultedPage(HttpWrapper httpWrapper, String resultedRedirectResource)
        throws ServletException, IOException {
//        if(!resultedRedirectResource.contains(RedirectionManager.REDIRECTION)) {
            httpWrapper.getRequest().getRequestDispatcher(resultedRedirectResource)
                    .forward(httpWrapper.getRequest(), httpWrapper.getResponse());
//        }
    }


}