package controller.command.commands.category;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Category;
import service.CategoryService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class GetCategoryByID implements Command {

    private final CategoryService categoryService;

    public GetCategoryByID(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        Optional<Category> category = categoryService.getById(Integer.parseInt(hashMap.get("category_number")));
        return category.map(value -> JSON.gson().toJson(value)).orElse(null);
    }
}
