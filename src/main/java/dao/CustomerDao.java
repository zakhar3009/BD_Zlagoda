package dao;

import entity.Check;
import entity.CustomerCard;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface CustomerDao extends GenericDao<CustomerCard, String>{
    List<CustomerCard> getAllOrderBySurname();
    List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname);
    List<CustomerCard> getCustomersByPercentOrderBySurname(int percent);
    HashMap<String, ArrayList<Check>> getCustomerCheckedOutByCashiers(List<String> employeesIds);
    List<CustomerCard> getCustomersWithoutCategoryPurchases(String categoryName);

    HashMap<String, String> getSelfCountOfClientsGroupedByCity(String employeeId);
}
