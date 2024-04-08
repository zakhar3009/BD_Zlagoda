package controller.command.commands.category;

import controller.command.Command;
import controller.utils.JSON;
import entity.Category;
import entity.Employee;
import service.CategoryService;
import service.EmployeeService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllCategoriesCommand implements Command {
    private final CategoryService categoryService;

    public GetAllCategoriesCommand(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Category> list = categoryService.getAll();
        return JSON.gson().toJson(list);
    }
}
