package controller.command.commands.product;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class GetProductsByCategoryOrderByName implements Command {

    private final ProductService productService;

    public GetProductsByCategoryOrderByName(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<Product> list = productService.searchProductsByCategoryOrderByName(hashMap.get("category_name"));
        return JSON.gson().toJson(list);
    }
}
