package controller.command.commands.category;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Category;
import service.CategoryService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateCategoryCommand implements Command {

    private final CategoryService categoryService;

    public CreateCategoryCommand(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Category category = CommandFactory.getAttributes(request, Category.class);
        categoryService.create(category);
        return JSON.gson().toJson("");
    }
}
