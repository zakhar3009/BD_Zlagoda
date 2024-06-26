package dao;

import entity.Product;

import java.util.List;

public interface ProductDao extends GenericDao<Product, Integer>{
    List<Product> getAllOrderByName();
    List<Product> getAllOrderByQuantity();
    List<Product> searchProductsByCategoryOrderByName(String categoryName);
    List<Product> getAllByPartOfName(String partOfName);

}
