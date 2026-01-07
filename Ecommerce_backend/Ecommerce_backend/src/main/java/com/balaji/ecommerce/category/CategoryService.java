package com.balaji.ecommerce.category;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // 🔐 ADMIN CREATE CATEGORY
    public Category createCategory(CategoryRequest request) {

        String normalizedName = request.getName().trim().toLowerCase();

        if (categoryRepository.existsByNameIgnoreCase(normalizedName)) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category();
        category.setName(normalizedName);

        // attach parent if provided
        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found"));
            category.setParent(parent);
        }

        return categoryRepository.save(category);
    }

    // 🌍 PUBLIC APIs
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getRootCategories() {
        return categoryRepository.findByParentIsNull();
    }
}
