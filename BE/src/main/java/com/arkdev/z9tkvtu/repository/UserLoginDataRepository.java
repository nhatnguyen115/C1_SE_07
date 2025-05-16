package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.UserLoginData;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserLoginDataRepository extends JpaRepository<UserLoginData, UUID> {
  Optional<UserLoginData> findByUsername(String username);
  boolean existsByUsername(@NotNull(message = "Username must be not null")
                             @Size(message = "Username must be greater than 50 char", max = 50)
                             @NotBlank(message = "Username must be not blank") String username);

    Optional<UserLoginData> findByEmail(String email);
}