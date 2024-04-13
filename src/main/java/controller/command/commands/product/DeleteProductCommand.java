package controller.command.commands.product;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteProductCommand implements Command {

    private final ProductService productService;

    public DeleteProductCommand(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, Double> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        Double id_product = hashMap.get("id_product");
        productService.delete(id_product.intValue());
        return JSON.gson().toJson("");
    }
}
