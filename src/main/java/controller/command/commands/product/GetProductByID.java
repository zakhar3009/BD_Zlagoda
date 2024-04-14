package controller.command.commands.product;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class GetProductByID implements Command {

    private final ProductService productService;

    public GetProductByID(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        Optional<Product> product = productService.getById(Integer.parseInt(hashMap.get("id_product")));
        return product.map(value -> JSON.gson().toJson(value)).orElse(null);
    }
}
