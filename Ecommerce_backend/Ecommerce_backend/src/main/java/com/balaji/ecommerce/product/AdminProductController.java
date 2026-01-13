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
    public ProductResponse create(@RequestBody ProductRequest request) {
        return new ProductResponse(productService.createProduct(request));
    }
    @PutMapping("/{id}")
    public Product update(
            @PathVariable Long id,
            @RequestBody ProductRequest request
    ) {
        return productService.updateProduct(id, request);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
    @PatchMapping("/{id}/stock")
    public Product updateStock(
            @PathVariable Long id,
            @RequestParam Integer stock
    ) {
        return productService.updateStock(id, stock);
    }


}
