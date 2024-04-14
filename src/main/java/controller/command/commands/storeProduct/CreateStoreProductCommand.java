package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateStoreProductCommand implements Command {

    private final StoreProductService storeProductService;

    public CreateStoreProductCommand(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        StoreProduct storeProduct = CommandFactory.getAttributes(request, StoreProduct.class);
        storeProductService.create(storeProduct);
        return JSON.gson().toJson("");
    }
}
