package dao;

import entity.Category;

import java.util.List;

public interface CategoryDao extends GenericDao<Category, Integer>{
    List<Category> getAllOrderByName();

}
