package com.balaji.ecommerce.product;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Product create(@RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }
}
