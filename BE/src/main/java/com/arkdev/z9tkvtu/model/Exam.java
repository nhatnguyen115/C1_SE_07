package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "exam")
public class Exam extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id", nullable = false, updatable = false)
    Integer id;

    @Column(name = "exam_name")
    private String examName;

    @Column(name = "total_score")
    private Integer totalScore;

    @Column(name = "duration")
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    private Test test;

    @ManyToMany
    @JoinTable(
            name = "exam_structure",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "part_id"))
    private Set<Part> parts = new HashSet<>();
}