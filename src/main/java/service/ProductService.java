package service;

import dao.DaoFactory;
import dao.ProductDao;
import entity.Product;

import java.util.List;
import java.util.Optional;

public class ProductService {

    private final DaoFactory daoFactory;

    private ProductService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final ProductService INSTANCE = new ProductService(DaoFactory.getDaoFactory());

    public static ProductService getInstance() {
        return INSTANCE;
    }

    List<Product> getAll(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAll();
    }

    Optional<Product> getById(Integer id){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getById(id);
    }

    void create(Product product){
        ProductDao productDao = daoFactory.createProductDao();
        productDao.create(product);
    }

    void update(Product product){
        ProductDao productDao = daoFactory.createProductDao();
        productDao.update(product);
    }

    void delete(Integer id){
        ProductDao productDao = daoFactory.createProductDao();
        productDao.delete(id);
    }

    List<Product> getAllOrderByName(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAllOrderByName();
    }
    List<Product> getAllOrderByQuantity(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAllOrderByQuantity();
    }
    List<Product> searchProductsByCategoryOrderByName(Integer id){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.searchProductsByCategoryOrderByName(id);
    }
    List<Product> getPromProductsOrderByQuantity(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getPromProductsOrderByQuantity();
    }
    List<Product> getPromProductsOrderByName(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getPromProductsOrderByName();
    }
    List<Product> getNonPromProductsOrderByQuantity(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getNonPromProductsOrderByQuantity();
    }
    List<Product> getNonPromProductsOrderByName(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getNonPromProductsOrderByName();
    }
    List<Product> getAllByPartOfName(String partOfName){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAllByPartOfName(partOfName);
    }
}
