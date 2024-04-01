package service;

import dao.CheckDao;
import dao.DaoFactory;
import entity.Check;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class CheckService {

    private final DaoFactory daoFactory;

    private CheckService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final CheckService INSTANCE = new CheckService(DaoFactory.getDaoFactory());

    public static CheckService getInstance() {
        return INSTANCE;
    }

    List<Check> getAll(){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getAll();
    }

    Optional<Check> getById(String id){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getById(id);
    }

    void create(Check check){
        CheckDao checkDao = daoFactory.createCheckDao();
        checkDao.create(check);
    }

    void update(Check check){
        CheckDao checkDao = daoFactory.createCheckDao();
        checkDao.update(check);
    }

    void delete(String id){
        CheckDao checkDao = daoFactory.createCheckDao();
        checkDao.delete(id);
    }

    double getChecksSumByEmployeeIdPerPeriod(String employeeId, LocalDate start, LocalDate end){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getChecksSumByEmployeeIdPerPeriod(employeeId, start, end);
    }
    double getChecksSumByPeriod(LocalDate start, LocalDate end){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getChecksSumByPeriod(start, end);
    }
    List<Check> getSelfDailyChecks(String employeeId, LocalDate day){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getSelfDailyChecks(employeeId, day);
    }
    List<Check> getSelfChecksPerPeriod(String employeeId, LocalDate start, LocalDate end){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getSelfChecksPerPeriod(employeeId, start, end);
    }
}
