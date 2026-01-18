package com.balaji.ecommerce.order;

import java.util.List;

public class PlaceOrderRequest {

    private List<Item> items;

    public List<Item> getItems() { return items; }

    public static class Item {
        private Long productId;
        private Integer quantity;

        public Long getProductId() { return productId; }
        public Integer getQuantity() { return quantity; }
    }
}
