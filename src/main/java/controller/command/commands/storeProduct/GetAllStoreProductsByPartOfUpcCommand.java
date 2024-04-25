package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class GetAllStoreProductsByPartOfUpcCommand  implements Command {
    private final StoreProductService storeProductService;

    public GetAllStoreProductsByPartOfUpcCommand(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getParameters(request);
        List<StoreProduct> list = storeProductService.searchByPartOfUPC(hashMap.get("query"));
        return JSON.gson().toJson(list);
    }
}
