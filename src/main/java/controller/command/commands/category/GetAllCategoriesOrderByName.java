package controller.command.commands.category;

import controller.command.Command;
import controller.utils.JSON;
import entity.Category;
import service.CategoryService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllCategoriesOrderByName implements Command {

    private final CategoryService categoryService;

    public GetAllCategoriesOrderByName(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Category> categories = categoryService.getAllOrderByName();
        return JSON.gson().toJson(categories);
    }
}
