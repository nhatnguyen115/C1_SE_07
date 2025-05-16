package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {
    List<Menu> findAllByParentOrderByOrderNumber(Menu parent);
    Optional<Menu> findByItemId(Integer itemId);

    @Query(value = """
     select MAX(m.order_number) from Menu m where m.parent_id = :parentId
    """, nativeQuery = true)
    Integer findMaxOByParentId(Integer parentId);
}