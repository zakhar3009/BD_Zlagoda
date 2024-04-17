package dao;

import entity.CustomerCard;

import java.util.List;

public interface CustomerDao extends GenericDao<CustomerCard, String>{
    List<CustomerCard> getAllOrderBySurname();
    List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname);
    List<CustomerCard> getCustomersByPercentOrderBySurname(int percent);

}
