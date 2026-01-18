package com.balaji.ecommerce.order;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 🛒 PLACE ORDER
    @PostMapping
    public Order placeOrder(Authentication auth,
                            @RequestBody PlaceOrderRequest request) {

        return orderService.placeOrder(auth.getName(), request);
    }

    // 📦 USER ORDERS
    @GetMapping("/my")
    public List<Order> myOrders(Authentication auth) {
        return orderService.myOrders(auth.getName());
    }
}
