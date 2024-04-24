package dao;

import entity.CustomerCard;
import entity.Employee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface CustomerDao extends GenericDao<CustomerCard, String>{
    List<CustomerCard> getAllOrderBySurname();
    List<CustomerCard> searchCustomersByPartOfSurname(String partOfSurname);
    List<CustomerCard> getCustomersByPercentOrderBySurname(int percent);
    HashMap<String, ArrayList<Employee>> getCustomerCheckedOutByCashiers(List<String> employeesIds);
    List<CustomerCard> getCustomersWithoutCategoryPurchases(String categoryName);

    HashMap<String, String> getSelfCountOfClientsGroupedByCity(String employeeId);
}
