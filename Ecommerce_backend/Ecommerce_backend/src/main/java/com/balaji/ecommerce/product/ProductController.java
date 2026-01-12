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
    public List<ProductResponse> getAll() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::new)
                .toList();
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> byCategory(@PathVariable Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(ProductResponse::new)
                .toList();
    }

    @GetMapping("/search")
    public List<ProductResponse> search(@RequestParam String q) {
        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q)
                .stream()
                .map(ProductResponse::new)
                .toList();
    }
}
