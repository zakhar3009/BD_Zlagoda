package dao;

import entity.CustomerCard;

import java.util.HashMap;
import java.util.List;

public interface CustomerDao extends GenericDao<CustomerCard, String>{
    List<CustomerCard> getAllOrderBySurname();
    List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname);
    List<CustomerCard> getCustomersByPercentOrderBySurname(int percent);
    List<CustomerCard> getCustomerCheckedOutByCashiers(String employeeID);
    List<CustomerCard> getCustomersWithoutCategoryPurchases(String categoryName);
    HashMap<String, String> getSelfCountOfClientsGroupedByCity(String employeeId);
    List<CustomerCard> getCustomersNoCashierCheckoutsNoPurchasesThisYear(String employeeId);
}
