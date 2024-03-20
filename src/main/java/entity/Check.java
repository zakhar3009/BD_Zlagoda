package entity;

import java.util.Date;
import java.util.Objects;

public class Check {

    private String number;
    private Employee employee;
    private CustomerCard customerCard;
    private Date printDate;
    private Double sumTotal;
    private String vat;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmployeeID() {
        return employee.getId();
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Check(String number, Employee employee, CustomerCard customerCard, Date printDate, Double sumTotal, String vat) {
        this.number = number;
        this.employee = employee;
        this.customerCard = customerCard;
        this.printDate = printDate;
        this.sumTotal = sumTotal;
        this.vat = vat;
    }

    public String getCustomerCardNumber() {
        return customerCard.getNumber();
    }

    public void setCustomerCard(CustomerCard customerCard) {
        this.customerCard = customerCard;
    }

    public Date getPrintDate() {
        return printDate;
    }

    public void setPrintDate(Date printDate) {
        this.printDate = printDate;
    }

    public Double getSumTotal() {
        return sumTotal;
    }

    public void setSumTotal(Double sumTotal) {
        this.sumTotal = sumTotal;
    }

    public String getVat() {
        return vat;
    }

    public void setVat(String vat) {
        this.vat = vat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Check check = (Check) o;
        return Objects.equals(number, check.number) && Objects.equals(employee, check.employee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number, employee);
    }
}
