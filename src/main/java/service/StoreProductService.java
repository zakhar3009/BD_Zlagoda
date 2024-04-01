package service;

import dao.DaoFactory;
import dao.StoreProductDao;
import entity.StoreProduct;

import java.util.List;
import java.util.Optional;

public class StoreProductService {

    private final DaoFactory daoFactory;

    private StoreProductService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final StoreProductService INSTANCE = new StoreProductService(DaoFactory.getDaoFactory());

    public static StoreProductService getInstance() {
        return INSTANCE;
    }

    List<StoreProduct> getAll(){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.getAll();
    }

    Optional<StoreProduct> getById(String id){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.getById(id);
    }

    void create(StoreProduct storeProduct){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.create(storeProduct);
    }

    void update(StoreProduct storeProduct){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.update(storeProduct);
    }

    void delete(String id){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.delete(id);
    }

    List<StoreProduct> getAllOrderByName(){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.getAllOrderByName();
    }
    Optional<StoreProduct> searchStoreProductByUpc(String upc){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.searchStoreProductByUpc(upc);
    }
}
