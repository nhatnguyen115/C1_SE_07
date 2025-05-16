package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "menu")
public class Menu extends AbstractEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id", nullable = false)
    private Integer id;

    @Column(name = "label")
    private String label;

    @Column(name = "url")
    private String url;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "icon")
    private String icon;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Menu parent;

    @OneToMany(mappedBy = "parent")
    private Set<Menu> submenus = new HashSet<>();

    public Menu(String url, String label, String description,
                Boolean status, Integer itemId, Menu parent,
                Integer orderNumber) {
        this.url = url;
        this.label = label;
        this.description = description;
        this.status = status;
        this.itemId = itemId;
        this.parent = parent;
        this.orderNumber = orderNumber;
    }
}