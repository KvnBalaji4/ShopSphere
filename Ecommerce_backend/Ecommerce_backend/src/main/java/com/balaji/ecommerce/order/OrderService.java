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

    @Transactional
    public Order placeOrder(String email, PlaceOrderRequest request) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (PlaceOrderRequest.Item item : request.getItems()) {

            Product product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException(
                    "Not enough stock for " + product.getName()
                );
            }

            // 🔥 reduce stock
            product.setStock(product.getStock() - item.getQuantity());
            productRepo.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());

            orderItems.add(orderItem);
            total += product.getPrice() * item.getQuantity();
        }

        order.setTotalAmount(total);
        order.setItems(orderItems);

        Order savedOrder = orderRepo.save(order);
        itemRepo.saveAll(orderItems);

        return savedOrder;
    }

    public List<Order> myOrders(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow();
        return orderRepo.findByUserId(user.getId());
    }
}
