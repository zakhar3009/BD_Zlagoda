package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreatePromStoreProduct implements Command {
    private final StoreProductService storeProductService;

    public CreatePromStoreProduct(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        StoreProduct storeProduct = CommandFactory.getAttributes(request, StoreProduct.class);
        storeProductService.createPromStoreProduct(storeProduct);
        return JSON.gson().toJson("");
    }
}