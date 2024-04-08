package entity;

import java.util.Objects;

public class Product {

    private Integer id;
    private Category category;
    private String name;
    private String characteristic;

    public static class Builder implements IBuilder<Product> {
        private Product product = new Product();

        public Product.Builder setID(Integer id){
            product.id = id;
            return this;
        }

        public Product.Builder setCategory(Category c){
            product.category = c;
            return this;
        }

        public Product.Builder setName(String name){
            product.name = name;
            return this;
        }

        public Product.Builder setCharacteristic(String characteristic){
            product.characteristic = characteristic;
            return this;
        }

        @Override
        public Product build() {
            return product;
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCharacteristic() {
        return characteristic;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(name, product.name);
    }

    public Product(Integer id, Category category, String name, String characteristic) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.characteristic = characteristic;
    }

    public Product() {}

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    public void setCharacteristic(String characteristic) {
        this.characteristic = characteristic;
    }
}
