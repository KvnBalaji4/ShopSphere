package com.balaji.ecommerce.product;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock; // ✅ ADD THIS
    private String imageUrl;
    private Long categoryId;
    private String categoryName;

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stock = product.getStock(); // ✅ ADD THIS
        this.imageUrl = product.getImageUrl();
        this.categoryId = product.getCategory().getId();
        this.categoryName = product.getCategory().getName();
    }

    // getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public Integer getStock() { return stock; } // ✅ ADD THIS
    public String getImageUrl() { return imageUrl; }
    public Long getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
}
