package com.balaji.ecommerce.order;

public class OrderItemResponse {

    private Long productId;
    private String productName;
    private String imageUrl;
    private Integer quantity;
    private Double price;

    public OrderItemResponse(OrderItem item) {
        this.productId = item.getProduct().getId();
        this.productName = item.getProduct().getName();
        this.imageUrl = item.getProduct().getImageUrl();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
    }

    // ===== GETTERS =====
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public String getImageUrl() { return imageUrl; }
    public Integer getQuantity() { return quantity; }
    public Double getPrice() { return price; }
}
