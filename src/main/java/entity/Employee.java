package entity;

import java.sql.Date;
import java.util.Objects;
public class Employee {

    private String email;
    private String password;
    private String id;
    private String surname;
    private String name;
    private String patronymic;
    private Role role;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
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

    public Employee(String email, String password, String id, String surname, String name,
                    String patronymic, Role role, double salary, Date dateOfBirth,
                    Date dateOfStart, String phoneNumber, String city, String street, String zipCode) {
        this.email = email;
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Employee (){};

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

    public static class Builder implements IBuilder<Employee> {

        private Employee employee = new Employee();

        public Builder setEmail(String email){
            employee.email = email;
            return this;
        }

        public Builder setPassword(String password){
            employee.password = password;
            return this;
        }

        public Builder setId(String id) {
            employee.id = id;
            return this;
        }

        public Builder setName(String name) {
            employee.name = name;
            return this;
        }

        public Builder setSurname(String surname) {
            employee.surname = surname;
            return this;
        }

        public Builder setCity(String city) {
            employee.city = city;
            return this;
        }
        public Builder setStreet(String street) {
            employee.street = street;
            return this;
        }

        public Builder setPhone(String phone) {
            employee.phoneNumber = phone;
            return this;
        }

        public Builder setRole(Role role) {
            employee.role = role;
            return this;
        }

        public Builder setZipCode(String zipCode) {
            employee.zipCode = zipCode;
            return this;
        }

        public Builder setDateOfBirth(Date dateOfBirth) {
            employee.dateOfBirth = dateOfBirth;
            return this;
        }
        public Builder setDateOfStart(Date dateOfStart) {
            employee.dateOfStart = dateOfStart;
            return this;
        }
        public Builder setPatronymic(String patronymic) {
            employee.patronymic = patronymic;
            return this;
        }
        public Builder setSalary(Double salary) {
            employee.salary = salary;
            return this;
        }

        @Override
        public Employee build() {
            return employee;
        }

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
