package service;

import dao.DaoFactory;
import dao.SaleDao;
import entity.Check;
import entity.Sale;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class SaleService {

    private final DaoFactory daoFactory;

    private SaleService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }
    private static final SaleService INSTANCE = new SaleService(DaoFactory.getDaoFactory());

    public static SaleService getInstance() {
        return INSTANCE;
    }

    public List<Sale> getAll(){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getAll();
    }

    public Optional<Sale> getById(HashMap<String, String> id){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getById(id);
    }

    public void create(Sale sale){
        SaleDao saleDao = daoFactory.createSaleDao();
        saleDao.create(sale);
    }

    public void update(Sale sale){
        SaleDao saleDao = daoFactory.createSaleDao();
        saleDao.update(sale);
    }

    public void delete(HashMap<String, String> id){
        SaleDao saleDao = daoFactory.createSaleDao();
        saleDao.delete(id);
    }

    public List<Check> getFullChecksByEmployeeIdPerPeriod(String employeeId, Date start, Date end){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getFullChecksByEmployeeIdPerPeriod(employeeId, start, end);
    }
    public List<Check> getFullChecksPerPeriod(Date start, Date end){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getFullChecksPerPeriod(start, end);
    }
    public int getQuantityOfSoldProductPerPeriod(String UPC, Date start, Date end){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getQuantityOfSoldProductPerPeriod(UPC, start, end);
    }
    public List<Sale> getFullCheckByNumber(String checkNumber){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getFullCheckByNumber(checkNumber);
    }

    public List<String> getAllUpcs(){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getAllUpcs();
    }
}
