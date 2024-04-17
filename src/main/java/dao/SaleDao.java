package dao;

import entity.Sale;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;

public interface SaleDao extends GenericDao<Sale, HashMap<String, String>>{
    List<List<Sale>> getFullChecksByEmployeeIdPerPeriod(String employeeId, Date start, Date end);
    List<List<Sale>> getFullChecksPerPeriod(Date start, Date end);
    int getQuantityOfSoldProductPerPeriod(String UPC, Date start, Date end);
    List<Sale> getFullCheckByNumber(String checkNumber);
}
