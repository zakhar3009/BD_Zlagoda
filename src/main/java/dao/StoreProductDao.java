package dao;

import entity.StoreProduct;

import java.util.List;
import java.util.Optional;

public interface StoreProductDao extends GenericDao<StoreProduct, String>{
    List<StoreProduct> getAllOrderByName();
    Optional<StoreProduct> searchStoreProductByUpc(String upc);

}
