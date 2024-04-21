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

    public List<Product> getAll(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAll();
    }

    public Optional<Product> getById(Integer id){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getById(id);
    }

    public void create(Product product){
        ProductDao productDao = daoFactory.createProductDao();
        productDao.create(product);
    }

    public void update(Product product){
        ProductDao productDao = daoFactory.createProductDao();
        productDao.update(product);
    }

    public void delete(Integer id){
        ProductDao productDao = daoFactory.createProductDao();
        productDao.delete(id);
    }

    public List<Product> getAllOrderByName(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAllOrderByName();
    }
    public List<Product> getAllOrderByQuantity(){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAllOrderByQuantity();
    }
    public List<Product> searchProductsByCategoryOrderByName(String name){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.searchProductsByCategoryOrderByName(name);
    }

    public List<Product> getAllByPartOfName(String partOfName){
        ProductDao productDao = daoFactory.createProductDao();
        return productDao.getAllByPartOfName(partOfName);
    }
}
