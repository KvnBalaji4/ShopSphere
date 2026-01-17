package com.balaji.ecommerce.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Child category products (Mobiles, Laptops, etc.)
    List<Product> findByCategoryId(Long categoryId);

    // 🔥 Parent category products (Electronics → Mobiles + Laptops + etc.)
    @Query("""
        SELECT p FROM Product p
        WHERE p.category.id IN (
            SELECT c.id FROM Category c WHERE c.parent.id = :parentId
        )
    """)
    List<Product> findByParentCategoryId(Long parentId);

    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name, String description
    );
}
