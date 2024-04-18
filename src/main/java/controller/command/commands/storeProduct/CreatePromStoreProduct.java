package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

public class CreatePromStoreProduct implements Command {
    private final StoreProductService storeProductService;

    public CreatePromStoreProduct(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        Optional<StoreProduct> storeProduct = storeProductService.getById(hashMap.get("UPC"));
        storeProduct.ifPresent(storeProductService::createPromStoreProduct);
        return JSON.gson().toJson("");
    }
}
