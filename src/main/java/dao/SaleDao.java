package dao;

import entity.Sale;

import java.time.LocalDate;
import java.util.List;

public interface SaleDao extends GenericDao<Sale, List<String>>{
    List<List<Sale>> getFullChecksByEmployeeIdPerPeriod(String employeeId, LocalDate start, LocalDate end);
    List<List<Sale>> getFullChecksPerPeriod(LocalDate start, LocalDate end);
    int getQuantityOfSoldProductPerPeriod(LocalDate start, LocalDate end);
    List<Sale> getFullCheckByNumber(String checkNumber);
}
