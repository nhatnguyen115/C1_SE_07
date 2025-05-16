package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.model.MembershipPlan;
import com.arkdev.z9tkvtu.model.ResourceAccess;
import com.arkdev.z9tkvtu.model.UserLoginData;
import com.arkdev.z9tkvtu.model.UserMembership;
import com.arkdev.z9tkvtu.repository.MembershipPlanRepository;
import com.arkdev.z9tkvtu.repository.ResourceAccessRepository;
import com.arkdev.z9tkvtu.repository.UserMembershipRepository;
import com.arkdev.z9tkvtu.util.MembershipStatus;
import com.arkdev.z9tkvtu.util.ResourceType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserMembershipService {
    MembershipPlanRepository membershipPlanRepository;
    UserMembershipRepository userMembershipRepository;
    ResourceAccessRepository resourceAccessRepository;
    PaymentService paymentService;

    @Transactional
    public String registerMembership(Integer planId,
                                   HttpServletRequest request,
                                   HttpServletResponse response) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();
        MembershipPlan membershipPlan = membershipPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Membership Plan Not Found"));
        UserMembership userMembership = userMembershipRepository.findByUserId(user.getId())
                .orElse(new UserMembership());
        if (userMembership.getStatus() == MembershipStatus.ACTIVE)
            throw new RuntimeException("Membership Status is Active");

        userMembership.setUser(user);
        userMembership.setPlan(membershipPlan);
        userMembership.setStartDate(Timestamp.valueOf(LocalDateTime.now()));
        userMembership.setEndDate(calculateEndDate(membershipPlan));
        userMembership.setStatus(MembershipStatus.PENDING);

        userMembershipRepository.save(userMembership);
        return paymentService.createPaymentUrl(membershipPlan.getPrice().intValue(), request, response);
    }

    public boolean checkResourceAccess(Integer resourceId, String tableName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();
        ResourceAccess resourceAccess = resourceAccessRepository.findByResourceId(resourceId)
                .orElse(new ResourceAccess());
        return resourceAccess.getResourceType() == ResourceType.MEMBER &&
                !userMembershipRepository.existsActiveMembership(user.getId());
    }

    @Transactional
    public void confirmMembership() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();
        UserMembership userMembership = userMembershipRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("User has not registered for membership package"));
        userMembership.setStatus(MembershipStatus.ACTIVE);
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * ?")
    public void expireMembership() {
        List<UserMembership> userMemberships = userMembershipRepository
                .findByEndDateBeforeAndStatus(Timestamp.valueOf(LocalDateTime.now()),
                        MembershipStatus.ACTIVE);
        userMemberships.forEach(membership ->
                membership.setStatus(MembershipStatus.EXPIRED));
    }

    private Timestamp calculateEndDate(MembershipPlan plan) {
        return Timestamp.valueOf(LocalDateTime.now()
                .plusDays(plan.getDurationDays()));
    }
}
