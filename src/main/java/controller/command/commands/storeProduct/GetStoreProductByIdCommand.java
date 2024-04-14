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

public class GetStoreProductByIdCommand implements Command {

    private final StoreProductService storeProductService;

    public GetStoreProductByIdCommand(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        Optional<StoreProduct> storeProduct = storeProductService.getById(hashMap.get("UPC"));
        return storeProduct.map(value -> JSON.gson().toJson(value)).orElse(null);
    }
}
