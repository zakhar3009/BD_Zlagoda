package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.StoreProduct;
import service.SaleService;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Optional;

public class DeleteStoreProductCommand implements Command {

    private final StoreProductService storeProductService;

    public DeleteStoreProductCommand(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request){
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        Optional<StoreProduct> optionalStoreProduct = storeProductService.getById(hashMap.get("UPC"));
        if(optionalStoreProduct.isPresent()){
            StoreProduct storeProduct = optionalStoreProduct.get();
            if(storeProduct.getPromStoreProduct() != null && !SaleService.getInstance().getAllUpcs().contains(storeProduct.getPromStoreProduct().getUPC())) {
                storeProductService.delete(storeProduct.getPromStoreProduct().getUPC());
            }
            storeProductService.delete(storeProduct.getUPC());
        }
        return JSON.gson().toJson("");
    }


}
