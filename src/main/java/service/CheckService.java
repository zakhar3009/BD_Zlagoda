package service;

import dao.CheckDao;
import dao.DaoFactory;
import entity.Check;

import java.sql.Date;
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

    public List<Check> getAll(){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getAll();
    }

    public List<Check> getAllByCashier(String id){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getAllByCashier(id);
    }

    public Optional<Check> getById(String id){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getById(id);
    }

    public void create(Check check){
        CheckDao checkDao = daoFactory.createCheckDao();
        checkDao.create(check);
    }

    public void update(Check check){
        CheckDao checkDao = daoFactory.createCheckDao();
        checkDao.update(check);
    }

    public void delete(String id){
        CheckDao checkDao = daoFactory.createCheckDao();
        checkDao.delete(id);
    }

    public double getChecksSumByEmployeeIdPerPeriod(String employeeId, Date start, Date end){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getChecksSumByEmployeeIdPerPeriod(employeeId, start, end);
    }
    public double getChecksSumPerPeriod(Date start, Date end){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getChecksSumByPeriod(start, end);
    }
    public List<Check> getSelfDailyChecks(String employeeId, Date day){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getSelfDailyChecks(employeeId, day);
    }
    public List<Check> getSelfChecksPerPeriod(String employeeId, Date start, Date end){
        CheckDao checkDao = daoFactory.createCheckDao();
        return checkDao.getSelfChecksPerPeriod(employeeId, start, end);
    }
}
