package controller.command.commands.product;

import controller.command.Command;
import controller.utils.JSON;
import entity.Product;
import service.ProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetNonPromProductsOrderByQuantity implements Command {

    private final ProductService productService;

    public GetNonPromProductsOrderByQuantity(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<Product> list = productService.getNonPromProductsOrderByQuantity();
        return JSON.gson().toJson(list);
    }
}
