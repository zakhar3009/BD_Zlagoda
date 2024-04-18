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

public class DeletePromStoreProduct implements Command {

    private final StoreProductService storeProductService;

    public DeletePromStoreProduct(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        Optional<StoreProduct> optionalStoreProduct = storeProductService.getById(hashMap.get("UPC"));
        if(optionalStoreProduct.isPresent()){
            StoreProduct storeProduct = optionalStoreProduct.get();
            storeProduct.setPromStoreProduct(null);
            storeProductService.update(storeProduct);
        }
        return JSON.gson().toJson("");
    }
}



