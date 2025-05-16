package com.arkdev.z9tkvtu.model;

import com.arkdev.z9tkvtu.util.QuestionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "part")
public class Part extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "part_id", nullable = false, updatable = false)
    Integer id;

    @Column(name = "part_name")
    private String partName;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "question_type")
    private QuestionType questionType;

    @Column(name = "instructions")
    private String instructions;

    @Column(name = "question_count")
    private Integer questionCount;

    @Column(name = "order_number")
    private Integer orderNumber;

    @OneToMany(mappedBy = "part", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Question> questions = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "media_id")
    private Media media;

    @ManyToMany(mappedBy = "parts")
    private Set<Section> sections = new HashSet<>();

    @ManyToMany(mappedBy = "parts")
    private Set<Exam> exams = new HashSet<>();
}