package entity;

import java.util.Date;
import java.util.Objects;

public class Employee {
    private String id;
    private String surname;
    private String name;
    private String patronymic;
    // TODO: replace by Employee role enam
    private String role;
    private double salary;
    private Date dateOfBirth;
    private Date dateOfStart;
    private String phoneNumber;
    private String city;
    private String street;
    private String zipCode;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Employee(String id, String surname, String name, String patronymic, String role, double salary, Date dateOfBirth, Date dateOfStart, String phoneNumber, String city, String street, String zipCode) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.role = role;
        this.salary = salary;
        this.dateOfBirth = dateOfBirth;
        this.dateOfStart = dateOfStart;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
    }

    public Date getDateOfStart() {
        return dateOfStart;
    }

    public void setDateOfStart(Date dateOfStart) {
        this.dateOfStart = dateOfStart;
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

    @Override
    public int hashCode() {
        return Objects.hash(id, surname, name, patronymic);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if ((obj == null) || (getClass() != obj.getClass())) {
            return false;
        }
        Employee other = (Employee) obj;
        if (!Objects.equals(name, other.name)) {
            return false;
        }
        if (!Objects.equals(surname, other.surname)) {
            return false;
        }
        if (!Objects.equals(patronymic, other.patronymic)) {
            return false;
        }
        return (Objects.equals(phoneNumber, other.phoneNumber));
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("User [id=").append(id).append(", name=").append(name).append(", surname=").append(surname)
                .append(", patronymic=").append(patronymic).append(", address=").append(role).append(", phone=")
                .append(phoneNumber).append(", dateOfBirth=").append(dateOfBirth)
                .append(", dateOfStart=").append(dateOfStart).append(", city=").append(city)
                .append(", street=").append(street).append(", zipCode=").append(zipCode).append("]");
        return builder.toString();
    }
}
