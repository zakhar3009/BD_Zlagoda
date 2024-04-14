package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public class DeleteStoreProductCommand implements Command {

    private final StoreProductService storeProductService;

    public DeleteStoreProductCommand(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        HashMap<String, String> hashMap = CommandFactory.getAttributes(request, HashMap.class);
        storeProductService.delete(hashMap.get("UPC"));
        return JSON.gson().toJson("");
    }
}
