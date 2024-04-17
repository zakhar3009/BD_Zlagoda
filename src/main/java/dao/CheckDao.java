package dao;

import entity.Check;

import java.sql.Date;
import java.util.List;

public interface CheckDao extends GenericDao<Check, String>{
    double getChecksSumByEmployeeIdPerPeriod(String employeeId, Date start, Date end);
    double getChecksSumByPeriod(Date start, Date end);
    List<Check> getSelfDailyChecks(String employeeId, Date day);
    List<Check> getSelfChecksPerPeriod(String employeeId, Date start, Date end);
}
