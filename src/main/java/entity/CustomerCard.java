package entity;

import java.util.Objects;

public class CustomerCard {

    private String number;
    private String customerSurname;
    private String customerName;
    private String customerPatronymic;
    private String phoneNumber;
    private String city;
    private String street;
    private String zipCode;
    private int percent;

    public CustomerCard(String number, String customerSurname, String customerName, String customerPatronymic, String phoneNumber, String city, String street, String zipCode, int percent) {
        this.number = number;
        this.customerSurname = customerSurname;
        this.customerName = customerName;
        this.customerPatronymic = customerPatronymic;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
        this.percent = percent;
    }

    public CustomerCard() {}

    public static class Builder implements IBuilder<CustomerCard> {
        private CustomerCard customerCard = new CustomerCard();

        public CustomerCard.Builder setNumber(String number){
            customerCard.number = number;
            return this;
        }

        public CustomerCard.Builder setCustomerSurname(String surname){
            customerCard.customerSurname = surname;
            return this;
        }

        public CustomerCard.Builder setCustomerName(String name){
            customerCard.customerSurname = name;
            return this;
        }

        public CustomerCard.Builder setPatronymic(String patronymic){
            customerCard.customerPatronymic = patronymic;
            return this;
        }

        public CustomerCard.Builder setPhoneNumber(String phoneNumber){
            customerCard.phoneNumber = phoneNumber;
            return this;
        }

        public CustomerCard.Builder setCity(String city){
            customerCard.city = city;
            return this;
        }

        public CustomerCard.Builder setStreet(String street){
            customerCard.street = street;
            return this;
        }

        public CustomerCard.Builder setZipCode(String zipCode){
            customerCard.zipCode = zipCode;
            return this;
        }

        public CustomerCard.Builder setPercent(int percent){
            customerCard.percent = percent;
            return this;
        }
        @Override
        public CustomerCard build() {
            return customerCard;
        }
    }



    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCustomerSurname() {
        return customerSurname;
    }

    public void setCustomerSurname(String customerSurname) {
        this.customerSurname = customerSurname;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPatronymic() {
        return customerPatronymic;
    }

    public void setCustomerPatronymic(String customerPatronymic) {
        this.customerPatronymic = customerPatronymic;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public int getPercent() {
        return percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerCard that = (CustomerCard) o;
        return Objects.equals(number, that.number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number);
    }
}
