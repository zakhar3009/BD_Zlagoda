package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetPromProductsOrderByName implements Command {

    private final StoreProductService productService;

    public GetPromProductsOrderByName(StoreProductService productService) {
        this.productService = productService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<StoreProduct> products = productService.getPromProductsOrderByName();
        return JSON.gson().toJson(products);
    }
}
