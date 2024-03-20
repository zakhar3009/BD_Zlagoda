package entity;

import java.util.Objects;

public class Category {

    private Long number;

    public Category(Long number, String name) {
        this.number = number;
        this.name = name;
    }

    private String name;

    public Category() {}

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if ((obj == null) || (getClass() != obj.getClass())) {
            return false;
        }
        Category other = (Category) obj;
        return (Objects.equals(name, other.name));
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Category [id=").append(number).append(", name=").append(name).append("]");
        return builder.toString();
    }
}
