package com.arkdev.z9tkvtu.model;

import com.arkdev.z9tkvtu.util.MembershipStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "user_membership")
public class UserMembership extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_id")
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date")
    private Timestamp startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_date")
    private Timestamp endDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status")
    private MembershipStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccount user;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private MembershipPlan plan;
}