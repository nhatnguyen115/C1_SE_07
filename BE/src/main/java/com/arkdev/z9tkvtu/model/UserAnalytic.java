package com.arkdev.z9tkvtu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "user_analytic")
public class UserAnalytic extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_analytic_id")
    private Integer id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "practice_date")
    private LocalDate practiceDate;

    @Column(name = "listening_reading_score")
    private Integer listeningReadingScore;

    @Column(name = "speaking_writing_score")
    private Integer speakingWritingScore;

    @Column(name = "total_time")
    private Integer totalTime;

    @Column(name = "tasks_completed")
    private Integer tasksCompleted;

}