package entity;

import java.util.Objects;

public class Sale {

    private StoreProduct storeProduct;
    private Check check;
    private Integer productNumber;
    private double sellingPrice;

    public StoreProduct getStoreProduct() {
        return storeProduct;
    }

    public void setStoreProduct(StoreProduct storeProduct) {
        this.storeProduct = storeProduct;
    }

    public Sale(StoreProduct saleUPC, Check check, Integer productNumber, double sellingPrice) {
        this.storeProduct = saleUPC;
        this.check = check;
        this.productNumber = productNumber;
        this.sellingPrice = sellingPrice;
    }

    public Sale() {}

    public static class Builder implements IBuilder<Sale> {
        private Sale sale = new Sale();

        public Sale.Builder setStoreProduct(StoreProduct storeProduct){
            sale.storeProduct = storeProduct;
            return this;
        }

        public Sale.Builder setCheck(Check check){
            sale.check = check;
            return this;
        }

        public Sale.Builder setProductNumber(Integer productNumber){
            sale.productNumber = productNumber;
            return this;
        }

        public Sale.Builder setSellingPrice(double sellingPrice){
            sale.sellingPrice = sellingPrice;
            return this;
        }

        @Override
        public Sale build() {
            return sale;
        }
    }

    public Check getCheck() {
        return check;
    }

    public void setCheck(Check check) {
        this.check = check;
    }

    public Integer getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(Integer productNumber) {
        this.productNumber = productNumber;
    }

    public double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sale sale = (Sale) o;
        return Objects.equals(storeProduct, sale.storeProduct) && Objects.equals(check, sale.check);
    }

    @Override
    public int hashCode() {
        return Objects.hash(storeProduct, check);
    }
}
