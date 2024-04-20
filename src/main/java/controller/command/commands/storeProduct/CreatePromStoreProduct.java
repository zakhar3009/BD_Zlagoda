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
        Optional<StoreProduct> optionalStoreProduct = storeProductService.getById(hashMap.get("UPC"));
        int productsNumber = Integer.parseInt(hashMap.get("products_number"));
        if(optionalStoreProduct.isPresent()){
            StoreProduct storeProduct = optionalStoreProduct.get();
            if(storeProduct.getPromStoreProduct().getUPC() == null) storeProductService.createPromStoreProduct(storeProduct, productsNumber);
            else storeProductService.update(new StoreProduct.Builder()
                            .setPromStoreProduct(new StoreProduct.Builder().build())
                            .setSellingPrice(storeProduct.getSellingPrice() * 0.8)
                            .setProductsNumber(productsNumber)
                            .setIsProm(true)
                            .setUpc(storeProduct.getPromStoreProduct().getUPC())
                            .build());
        }
        return JSON.gson().toJson("");
    }
}
