package com.arkdev.z9tkvtu.model;

import com.arkdev.z9tkvtu.util.DifficultyLevel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "question")
public class Question extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id", nullable = false, updatable = false)
    Integer id;

    @Column(name = "content")
    private String content;

    @Column(name = "options")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> options;

    @Column(name = "correct_answer")
    private String correctAnswer;

    @Column(name = "explanation")
    private String explanation;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "difficulty")
    private DifficultyLevel difficulty;

    @ManyToOne
    @JoinColumn(name = "part_id")
    private Part part;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "media_id")
    private Media media;
}