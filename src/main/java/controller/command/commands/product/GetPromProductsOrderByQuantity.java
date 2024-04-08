package controller.command.commands.product;

import controller.command.Command;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetPromProductsOrderByQuantity implements Command {

    private final ProductService productService;

    public GetPromProductsOrderByQuantity(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Product> products = productService.getPromProductsOrderByQuantity();
        return JSON.gson().toJson(products);
    }
}
