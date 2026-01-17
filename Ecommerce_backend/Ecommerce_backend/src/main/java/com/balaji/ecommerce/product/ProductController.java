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

    // ===== ALL PRODUCTS =====
    @GetMapping
    public List<ProductResponse> getAll() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::new)
                .toList();
    }

    // ===== CHILD CATEGORY =====
    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> byCategory(@PathVariable Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(ProductResponse::new)
                .toList();
    }

    // ===== PARENT CATEGORY (FIX FOR ELECTRONICS) =====
    @GetMapping("/parent-category/{parentId}")
    public List<ProductResponse> byParentCategory(@PathVariable Long parentId) {
        return productRepository.findByParentCategoryId(parentId)
                .stream()
                .map(ProductResponse::new)
                .toList();
    }

    // ===== SEARCH =====
    @GetMapping("/search")
    public List<ProductResponse> search(@RequestParam String q) {
        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q)
                .stream()
                .map(ProductResponse::new)
                .toList();
    }

    // ===== PRODUCT DETAIL =====
    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ProductResponse::new)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
