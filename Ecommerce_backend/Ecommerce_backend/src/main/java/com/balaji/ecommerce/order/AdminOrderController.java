package com.balaji.ecommerce.order;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    private final OrderRepository orderRepo;

    public AdminOrderController(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @GetMapping
    public List<OrderResponse> allOrders() {
        return orderRepo.findAll()
                .stream()
                .map(OrderResponse::new)
                .toList();
    }

    @PatchMapping("/{id}/status")
    public void updateStatus(@PathVariable Long id,
                             @RequestParam OrderStatus status) {

        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        orderRepo.save(order);
    }
}
