package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "section_part_practice")
public class SectionPartPractice extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "practice_id", nullable = false)
    private Integer id;

    @Column(name = "correct_count")
    private Integer correctCount;

    @Column(name = "total_time")
    private Integer totalTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccount user;

    @ManyToOne
    @JoinColumn(name = "part_id", nullable = false)
    private Part part;

    @OneToMany(mappedBy = "practice", cascade = CascadeType.ALL,  orphanRemoval = true)
    private Set<SectionPartAnswer> answers;
}