package service;

import dao.CustomerDao;
import dao.DaoFactory;
import entity.CustomerCard;

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

    List<CustomerCard> getAll(){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getAll();
    }

    Optional<CustomerCard> getById(String id){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getById(id);
    }

    void create(CustomerCard customerCard){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        customerDao.create(customerCard);
    }

    void update(CustomerCard customerCard){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        customerDao.update(customerCard);
    }

    void delete(String id){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        customerDao.delete(id);
    }

    List<CustomerCard> getAllOrderBySurname(){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.getAllOrderBySurname();
    }
    List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname){
        CustomerDao customerDao = daoFactory.createCustomerDao();
        return customerDao.searchCustomersByPartOfSurname(partOfSurname);
    }
}
