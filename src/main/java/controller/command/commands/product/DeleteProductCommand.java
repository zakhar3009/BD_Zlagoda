package controller.command.commands.product;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
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
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        productService.delete(Integer.parseInt(hashMap.get("id_product")));
        return JSON.gson().toJson("");
    }
}
