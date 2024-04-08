package controller.command.commands.product;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class UpdateProductCommand implements Command {
    private final ProductService productService;

    public UpdateProductCommand(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Product product = CommandFactory.getAttributes(request, Product.class);
        productService.update(product);
        return JSON.gson().toJson("");
    }
}
