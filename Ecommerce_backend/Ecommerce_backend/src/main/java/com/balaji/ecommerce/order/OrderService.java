package com.balaji.ecommerce.order;

import com.balaji.ecommerce.product.Product;
import com.balaji.ecommerce.product.ProductRepository;
import com.balaji.ecommerce.user.User;
import com.balaji.ecommerce.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final OrderItemRepository itemRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo,
                        OrderItemRepository itemRepo,
                        ProductRepository productRepo,
                        UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.itemRepo = itemRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    // 🛒 PLACE ORDER
    @Transactional
    public Order placeOrder(String email, PlaceOrderRequest request) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (PlaceOrderRequest.Item reqItem : request.getItems()) {

            Product product = productRepo.findById(reqItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < reqItem.getQuantity()) {
                throw new RuntimeException(
                        "Not enough stock for " + product.getName()
                );
            }

            // 🔥 reduce stock
            product.setStock(product.getStock() - reqItem.getQuantity());
            productRepo.save(product);

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(reqItem.getQuantity());
            item.setPrice(product.getPrice());

            items.add(item);
            total += product.getPrice() * reqItem.getQuantity();
        }

        order.setTotalAmount(total);
        order.setItems(items);

        Order savedOrder = orderRepo.save(order);
        itemRepo.saveAll(items);

        return savedOrder;
    }

    // 📦 USER ORDER HISTORY
    public List<Order> myOrders(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return orderRepo.findByUserId(user.getId());
    }

    // 📄 ORDER DETAIL (USER)
    public Order getOrderForUser(Long orderId, String email) {

        User user = userRepo.findByEmail(email).orElseThrow();

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        return order;
    }
}
