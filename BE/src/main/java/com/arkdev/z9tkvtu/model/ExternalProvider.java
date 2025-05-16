package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "external_provider")
public class ExternalProvider extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id", nullable = false, updatable = false)
    Integer id;

    @Column(name = "provider_name")
    private String providerName;

    @Column(name = "ws_endpoint")
    private String wsEndpoint;
}