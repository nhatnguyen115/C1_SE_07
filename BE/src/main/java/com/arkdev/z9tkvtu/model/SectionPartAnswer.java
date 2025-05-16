package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "section_part_answer")
@NoArgsConstructor
public class SectionPartAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id", nullable = false)
    private Integer id;

    @Column(name = "selected_answer", length = Integer.MAX_VALUE)
    private String selectedAnswer;

    @ManyToOne
    @JoinColumn(name = "practice_id")
    private SectionPartPractice practice;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public SectionPartAnswer(SectionPartPractice practice,
                             Question question,
                             @NotNull(message = "Selected answer must be not null") String selectedAnswer) {
        this.practice = practice;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
    }
}