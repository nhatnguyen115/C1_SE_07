package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.MembershipPlan;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Integer> {
    Optional<MembershipPlan> findByPlanName(@NotNull(message = "Plan name must be not null")
                                            @NotBlank(message = "Plan name must be not null") String planName);
}