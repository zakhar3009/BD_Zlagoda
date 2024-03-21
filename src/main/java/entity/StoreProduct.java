package entity;

public class StoreProduct {

    private String UPC;
    private Sale upcProm;
    private Product product;
    private Double sellingPrice;
    private Integer productsNumber;
    private Boolean promotionalProduct;

    public String getUPC() {
        return UPC;
    }

    public void setUPC(String UPC) {
        this.UPC = UPC;
    }

    public String getUpcProm() {
        return upcProm.getSaleUPC();
    }

    public void setUpcProm(Sale upcProm) {
        this.upcProm = upcProm;
    }

    public StoreProduct(String UPC, Sale upcProm, Product product, Double sellingPrice, Integer productsNumber, Boolean promotionalProduct) {
        this.UPC = UPC;
        this.upcProm = upcProm;
        this.product = product;
        this.sellingPrice = sellingPrice;
        this.productsNumber = productsNumber;
        this.promotionalProduct = promotionalProduct;
    }

    public Integer getProductID() {
        return product.getId();
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Integer getProductsNumber() {
        return productsNumber;
    }

    public void setProductsNumber(Integer productsNumber) {
        this.productsNumber = productsNumber;
    }

    public Boolean getPromotionalProduct() {
        return promotionalProduct;
    }

    public void setPromotionalProduct(Boolean promotionalProduct) {
        this.promotionalProduct = promotionalProduct;
    }
}
