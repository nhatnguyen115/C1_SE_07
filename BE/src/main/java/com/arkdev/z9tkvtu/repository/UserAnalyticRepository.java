package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.UserAnalytic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAnalyticRepository extends JpaRepository<UserAnalytic, Integer> {
}