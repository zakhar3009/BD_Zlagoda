package dao;

import entity.StoreProduct;

import java.util.List;

public interface StoreProductDao extends GenericDao<StoreProduct, String>{
    List<StoreProduct> getAllOrderByName();
    List<StoreProduct> getAllOrderByQuantity();
    void createPromStoreProduct(StoreProduct storeProduct);

}
