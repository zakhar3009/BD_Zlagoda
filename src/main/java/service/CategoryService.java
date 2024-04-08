package service;

import dao.CategoryDao;
import dao.DaoFactory;
import entity.Category;

import java.util.List;
import java.util.Optional;

public class CategoryService {

    private final DaoFactory daoFactory;

    private CategoryService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final CategoryService INSTANCE = new CategoryService(DaoFactory.getDaoFactory());

    public static CategoryService getInstance() {
        return INSTANCE;
    }

    public List<Category> getAll(){
        CategoryDao categoryDao = daoFactory.createCategoryDao();
        return categoryDao.getAll();
    }

    public Optional<Category> getById(Integer id){
        CategoryDao categoryDao = daoFactory.createCategoryDao();
        return categoryDao.getById(id);
    }

    public void create(Category category){
        CategoryDao categoryDao = daoFactory.createCategoryDao();
        categoryDao.create(category);
    }

    public void update(Category category){
        CategoryDao categoryDao = daoFactory.createCategoryDao();
        categoryDao.update(category);
    }

    public void delete(Integer id){
        CategoryDao categoryDao = daoFactory.createCategoryDao();
        categoryDao.delete(id);
    }

    public List<Category> getAllOrderByName(){
        CategoryDao categoryDao = daoFactory.createCategoryDao();
        return categoryDao.getAllOrderByName();
    }
}
