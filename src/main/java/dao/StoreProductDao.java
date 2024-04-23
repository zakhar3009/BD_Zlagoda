package dao;

import entity.StoreProduct;

import java.util.List;

public interface StoreProductDao extends GenericDao<StoreProduct, String>{
    List<StoreProduct> getAllOrderByName();
    List<StoreProduct> getAllOrderByQuantity();
    void createPromStoreProduct(StoreProduct storeProduct, int productsNumber);
    List<StoreProduct> getPromProductsOrderByQuantity();
    List<StoreProduct> getPromProductsOrderByName();
    List<StoreProduct> getNonPromProductsOrderByQuantity();
    List<StoreProduct> getNonPromProductsOrderByName();


}
