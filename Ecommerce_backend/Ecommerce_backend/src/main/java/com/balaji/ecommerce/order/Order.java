package com.balaji.ecommerce.order;

import com.balaji.ecommerce.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private String status; // PLACED, CANCELLED

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
        status = "PLACED";
    }

    // getters & setters
    public Long getId() { return id; }
    public User getUser() { return user; }
    public Double getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItem> getItems() { return items; }

    public void setUser(User user) { this.user = user; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
