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

    public List<StoreProduct> getAll(){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.getAll();
    }

    public Optional<StoreProduct> getById(String id){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.getById(id);
    }

    public void create(StoreProduct storeProduct){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.create(storeProduct);
    }

    public void update(StoreProduct storeProduct){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.update(storeProduct);
    }

    public void delete(String id){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.delete(id);
    }

    public List<StoreProduct> getAllOrderByName(){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        return storeProductDao.getAllOrderByName();
    }

    public void createPromStoreProduct(StoreProduct storeProduct){
        StoreProductDao storeProductDao = daoFactory.createStoreProductDao();
        storeProductDao.createPromStoreProduct(storeProduct);
    }
}
