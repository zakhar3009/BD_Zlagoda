package entity;

import org.jetbrains.annotations.Nullable;

public class StoreProduct {

    private String UPC;
    private StoreProduct promStoreProduct;
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

    public StoreProduct getPromStoreProduct() {
        return promStoreProduct;
    }

    public void setPromStoreProduct(StoreProduct promStoreProduct) {
        this.promStoreProduct = promStoreProduct;
    }

    public StoreProduct(String UPC, StoreProduct promStoreProduct, Product product, Double sellingPrice, Integer productsNumber, Boolean promotionalProduct) {
        this.UPC = UPC;
        this.promStoreProduct = promStoreProduct;
        this.product = product;
        this.sellingPrice = sellingPrice;
        this.productsNumber = productsNumber;
        this.promotionalProduct = promotionalProduct;
    }

    public StoreProduct() {}
    public static class Builder implements IBuilder<StoreProduct> {
        private StoreProduct storeProduct = new StoreProduct();

        public StoreProduct.Builder setUpc(String upc){
            storeProduct.UPC = upc;
            return this;
        }

        public StoreProduct.Builder setPromStoreProduct(@Nullable StoreProduct storeProduct){
            this.storeProduct.promStoreProduct = storeProduct;
            return this;
        }

        public StoreProduct.Builder setProduct(Product product){
            storeProduct.product = product;
            return this;
        }

        public StoreProduct.Builder setSellingPrice(double sellingPrice){
            storeProduct.sellingPrice = sellingPrice;
            return this;
        }

        public StoreProduct.Builder setProductsNumber(Integer productsNumber){
            storeProduct.productsNumber = productsNumber;
            return this;
        }

        public StoreProduct.Builder setIsProm(Boolean isProm){
            storeProduct.promotionalProduct = isProm;
            return this;
        }

        @Override
        public StoreProduct build() {
            return storeProduct;
        }
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
