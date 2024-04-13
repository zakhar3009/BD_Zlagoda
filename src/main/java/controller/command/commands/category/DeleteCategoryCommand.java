package controller.command.commands.category;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.CategoryService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteCategoryCommand implements Command {

    private final CategoryService categoryService;

    public DeleteCategoryCommand(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, Double> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        Double id = hashMap.get("id");
        categoryService.delete(id.intValue());
        return JSON.gson().toJson("");
    }
}
