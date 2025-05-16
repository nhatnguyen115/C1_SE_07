package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.UserMembership;
import com.arkdev.z9tkvtu.util.MembershipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserMembershipRepository extends JpaRepository<UserMembership, Integer> {

    @Query(value = """
        select exists (
                select um.*
                from user_membership um
                where um.user_id = :userId
                and um.status = 'ACTIVE'
            )
    """, nativeQuery = true)
    boolean existsActiveMembership(@Param("userId") UUID userId);

    List<UserMembership> findByEndDateBeforeAndStatus(Timestamp currentTime, MembershipStatus membershipStatus);

    Optional<UserMembership> findByUserId(UUID id);
}