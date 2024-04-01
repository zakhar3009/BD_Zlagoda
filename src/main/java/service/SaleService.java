package service;

import dao.DaoFactory;
import dao.SaleDao;
import entity.Sale;

import java.time.LocalDate;
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

    List<Sale> getAll(){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getAll();
    }

    Optional<Sale> getById(List<String> id){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getById(id);
    }

    void create(Sale sale){
        SaleDao saleDao = daoFactory.createSaleDao();
        saleDao.create(sale);
    }

    void update(Sale sale){
        SaleDao saleDao = daoFactory.createSaleDao();
        saleDao.update(sale);
    }

    void delete(List<String> id){
        SaleDao saleDao = daoFactory.createSaleDao();
        saleDao.delete(id);
    }

    List<List<Sale>> getFullChecksByEmployeeIdPerPeriod(String employeeId, LocalDate start, LocalDate end){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getFullChecksByEmployeeIdPerPeriod(employeeId, start, end);
    }
    List<List<Sale>> getFullChecksPerPeriod(LocalDate start, LocalDate end){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getFullChecksPerPeriod(start, end);
    }
    int getQuantityOfSoldProductPerPeriod(LocalDate start, LocalDate end){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getQuantityOfSoldProductPerPeriod(start, end);
    }
    List<Sale> getFullCheckByNumber(String checkNumber){
        SaleDao saleDao = daoFactory.createSaleDao();
        return saleDao.getFullCheckByNumber(checkNumber);
    }
}
