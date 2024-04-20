package controller.command.commands.sale;

import controller.command.Command;
import controller.command.commands.CommandFactory;
import controller.utils.JSON;
import entity.Sale;
import entity.StoreProduct;
import service.SaleService;
import service.StoreProductService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CreateSaleCommand implements Command {

    private final SaleService saleService;

    public CreateSaleCommand(SaleService saleService) {
        this.saleService = saleService;
    }

    @Override
    public String execute(HttpServletRequest request) throws IOException {
        Sale sale = CommandFactory.getAttributes(request, Sale.class);
        StoreProduct storeProduct = sale.getStoreProduct();
        storeProduct.setProductsNumber(storeProduct.getProductsNumber() - 1);
        StoreProductService.getInstance().update(storeProduct);
        saleService.create(sale);
        return JSON.gson().toJson("");
    }
}
