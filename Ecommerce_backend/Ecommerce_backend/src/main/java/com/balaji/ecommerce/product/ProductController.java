package com.balaji.ecommerce.product;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> byCategory(@PathVariable Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String q) {
        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
    }
}
