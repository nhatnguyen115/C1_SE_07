package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.MembershipPlanRequest;
import com.arkdev.z9tkvtu.dto.Response.MembershipPlanResponse;
import com.arkdev.z9tkvtu.mapper.MembershipPlanMapper;
import com.arkdev.z9tkvtu.model.MembershipPlan;
import com.arkdev.z9tkvtu.repository.MembershipPlanRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MembershipPlanService {
    MembershipPlanRepository membershipPlanRepository;
    MembershipPlanMapper membershipPlanMapper;

    public List<MembershipPlanResponse> getMembershipPlans() {
        return membershipPlanRepository.findAll()
                .stream().map(membershipPlanMapper::toMembershipPlanResponse)
                .toList();
    }

    @Transactional
    public void addMembershipPlan(MembershipPlanRequest request) {
        membershipPlanRepository.findByPlanName(request.getPlanName())
                .ifPresent(plan -> {
                    throw new IllegalStateException("Membership plan with name " + request.getPlanName() + " already exists");
                });
        MembershipPlan membershipPlan = membershipPlanMapper.toMembershipPlan(request);
        membershipPlanRepository.save(membershipPlan);
    }

    @Transactional
    public void updateMembershipPlan(Integer planId, MembershipPlanRequest request) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(planId)
                .orElseThrow(() -> new IllegalStateException("Membership plan with id " + planId + " does not exist"));
        membershipPlanMapper.updateMembershipPlan(membershipPlan, request);
    }

    @Transactional
    public void deleteMembershipPlan(Integer planId) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(planId)
                .orElseThrow(() -> new IllegalStateException("Membership plan with id " + planId + " does not exist"));
        membershipPlanRepository.delete(membershipPlan);
    }
}
