package entity;

import java.util.Objects;

public class Sale {

    private StoreProduct saleUPC;
    private Check check;
    private Long productNumber;
    private double sellingPrice;

    public String getSaleUPC() {
        return saleUPC.getUPC();
    }

    public void setSaleUPC(StoreProduct saleUPC) {
        this.saleUPC = saleUPC;
    }

    public Sale(StoreProduct saleUPC, Check check, Long productNumber, double sellingPrice) {
        this.saleUPC = saleUPC;
        this.check = check;
        this.productNumber = productNumber;
        this.sellingPrice = sellingPrice;
    }

    public Check getCheckNumber() {
        return check;
    }

    public void setCheck(Check check) {
        this.check = check;
    }

    public Long getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(Long productNumber) {
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
        return Objects.equals(saleUPC, sale.saleUPC) && Objects.equals(check, sale.check);
    }

    @Override
    public int hashCode() {
        return Objects.hash(saleUPC, check);
    }
}
