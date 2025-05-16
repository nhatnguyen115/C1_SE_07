package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_login_external")
@PrimaryKeyJoinColumn(name = "user_id")
public class UserLoginExternal extends UserAccount {
    @Size(max = 255)
    @Column(name = "external_token")
    private String externalToken;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private ExternalProvider provider;
}