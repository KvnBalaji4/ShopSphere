package com.balaji.ecommerce.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // 🔗 parent category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    private Category parent;

    // 🌲 child categories
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Category> children;

    // getters & setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Category getParent() {
        return parent;
    }

    public List<Category> getChildren() {
        return children;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setParent(Category parent) {
        this.parent = parent;
    }
}
