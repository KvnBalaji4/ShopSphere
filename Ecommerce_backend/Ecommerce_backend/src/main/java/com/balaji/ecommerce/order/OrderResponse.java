package com.balaji.ecommerce.order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {

    private Long id;
    private Double totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public OrderResponse(Order order) {
        this.id = order.getId();
        this.totalAmount = order.getTotalAmount();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponse::new)
                .toList();
    }

    // ===== GETTERS =====
    public Long getId() { return id; }
    public Double getTotalAmount() { return totalAmount; }
    public OrderStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItemResponse> getItems() { return items; }
}
