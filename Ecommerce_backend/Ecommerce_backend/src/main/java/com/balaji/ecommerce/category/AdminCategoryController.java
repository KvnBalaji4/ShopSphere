package com.balaji.ecommerce.category;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    private final CategoryService categoryService;

    public AdminCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category create(@RequestBody CategoryRequest request) {
        return categoryService.createCategory(request);
    }
}
