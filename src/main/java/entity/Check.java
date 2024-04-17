package entity;
import java.sql.Date;
import java.util.Objects;

public class Check {

    private String number;
    private Employee employee;
    private CustomerCard customerCard;
    private Date printDate;
    private Double sumTotal;
    private Double vat;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Check(String number, Employee employee, CustomerCard customerCard, Date printDate, Double sumTotal, Double vat) {
        this.number = number;
        this.employee = employee;
        this.customerCard = customerCard;
        this.printDate = printDate;
        this.sumTotal = sumTotal;
        this.vat = vat;
    }

    public Check() {}

    public static class Builder implements IBuilder<Check> {
        private Check check = new Check();

        public Check.Builder setNumber(String number){
            check.number = number;
            return this;
        }

        public Check.Builder setEmployee(Employee employee){
            check.employee = employee;
            return this;
        }

        public Check.Builder setCustomerCard(CustomerCard customerCard){
            check.customerCard = customerCard;
            return this;
        }

        public Check.Builder setPrintDate(Date printDate){
            check.printDate = printDate;
            return this;
        }

        public Check.Builder setTotalSum(double totalSum){
            check.sumTotal = totalSum;
            return this;
        }

        public Check.Builder setVat(Double vat){
            check.vat = vat;
            return this;
        }

        @Override
        public Check build() {
            return check;
        }
    }

    public CustomerCard getCustomerCard() {
        return customerCard;
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

    public Double getVat() {
        return vat;
    }

    public void setVat(Double vat) {
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
