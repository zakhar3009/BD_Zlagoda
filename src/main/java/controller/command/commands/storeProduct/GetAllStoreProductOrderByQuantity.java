package controller.command.commands.storeProduct;

import controller.command.Command;
import controller.utils.JSON;
import entity.StoreProduct;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetAllStoreProductOrderByQuantity implements Command {

    private final StoreProductService storeProductService;

    public GetAllStoreProductOrderByQuantity(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        List<StoreProduct> list = storeProductService.getAllOrderByQuantity();
        return JSON.gson().toJson(list);
    }
}
