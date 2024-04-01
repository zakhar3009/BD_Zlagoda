package dao;

import entity.Check;

import java.time.LocalDate;
import java.util.List;

public interface CheckDao extends GenericDao<Check, String>{
    double getChecksSumByEmployeeIdPerPeriod(String employeeId, LocalDate start, LocalDate end);
    double getChecksSumByPeriod(LocalDate start, LocalDate end);
    List<Check> getSelfDailyChecks(String employeeId, LocalDate day);
    List<Check> getSelfChecksPerPeriod(String employeeId, LocalDate start, LocalDate end);
}
