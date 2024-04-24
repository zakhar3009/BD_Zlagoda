package service;

import dao.CustomerDao;
import dao.DaoFactory;
import entity.CustomerCard;
import entity.Employee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class CustomerService {

    private final DaoFactory daoFactory;

    private CustomerService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final CustomerService INSTANCE = new CustomerService(DaoFactory.getDaoFactory());

    public static CustomerService getInstance() {
        return INSTANCE;
    }

    public List<CustomerCard> getAll(){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getAll();
    }

    public Optional<CustomerCard> getById(String id){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getById(id);
    }

    public void create(CustomerCard customerCard){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        customerDao.create(customerCard);
    }

    public void update(CustomerCard customerCard){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        customerDao.update(customerCard);
    }

    public void delete(String id){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        customerDao.delete(id);
    }

    public List<CustomerCard> getAllOrderBySurname(){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getAllOrderBySurname();
    }
    public List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.searchCustomersByPartOfSurname(partOfSurname);
    }

    public List<CustomerCard> getCustomersByPercentOrderBySurname(int percent){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getCustomersByPercentOrderBySurname(percent);
    }

    public HashMap<String, ArrayList<Employee>> getCustomerCheckedOutByCashiers(List<String> cashiersIds){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getCustomerCheckedOutByCashiers(cashiersIds);
    }

    public List<CustomerCard> getCustomersWithoutCategoryPurchases(String categoryName){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getCustomersWithoutCategoryPurchases(categoryName);
    }
}
