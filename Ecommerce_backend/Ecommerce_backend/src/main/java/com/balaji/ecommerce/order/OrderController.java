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
    public OrderResponse placeOrder(Authentication auth,
                                    @RequestBody PlaceOrderRequest request) {

        return new OrderResponse(
                orderService.placeOrder(auth.getName(), request)
        );
    }

    // 📦 USER ORDER HISTORY
    @GetMapping("/my")
    public List<OrderResponse> myOrders(Authentication auth) {
        return orderService.myOrders(auth.getName())
                .stream()
                .map(OrderResponse::new)
                .toList();
    }

    // 📄 ORDER DETAIL
    @GetMapping("/{id}")
    public OrderResponse orderDetail(@PathVariable Long id,
                                     Authentication auth) {
        return new OrderResponse(
                orderService.getOrderForUser(id, auth.getName())
        );
    }
}
