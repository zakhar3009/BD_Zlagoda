package controller.command.commands.product;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateProductCommand implements Command {

    private final ProductService productService;

    public CreateProductCommand(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Product product = CommandFactory.getAttributes(request, Product.class);
        productService.create(product);
        return JSON.gson().toJson("");
    }
}
