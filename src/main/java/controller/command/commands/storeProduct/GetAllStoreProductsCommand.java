package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllStoreProductsCommand implements Command {

    private final StoreProductService storeProductService;

    public GetAllStoreProductsCommand(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<StoreProduct> list = storeProductService.getAll();
        return JSON.gson().toJson(list);
    }
}
