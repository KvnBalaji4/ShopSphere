package com.balaji.ecommerce.product;

public class ProductRequest {

    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Long categoryId;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Long getCategoryId() {
        return categoryId;
    }
}
