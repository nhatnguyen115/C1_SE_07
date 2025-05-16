package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.MembershipPlanRequest;
import com.arkdev.z9tkvtu.dto.Response.MembershipPlanResponse;
import com.arkdev.z9tkvtu.model.MembershipPlan;
import org.springframework.stereotype.Component;

@Component
public class MembershipPlanMapper {
    public MembershipPlan toMembershipPlan(MembershipPlanRequest request) {
        if (request == null) return null;
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setPlanName(request.getPlanName());
        membershipPlan.setDescription(request.getDescription());
        membershipPlan.setPrice(request.getPrice());
        membershipPlan.setDurationDays(request.getDurationDays());
        return membershipPlan;
    }

    public void updateMembershipPlan(MembershipPlan membershipPlan, MembershipPlanRequest request) {
        if (request == null) return;
        membershipPlan.setPlanName(request.getPlanName());
        membershipPlan.setDescription(request.getDescription());
        membershipPlan.setPrice(request.getPrice());
        membershipPlan.setDurationDays(request.getDurationDays());
    }

    public MembershipPlanResponse toMembershipPlanResponse(MembershipPlan membershipPlan) {
        if (membershipPlan == null) return null;
        return  new MembershipPlanResponse(
                membershipPlan.getId(),
                membershipPlan.getPlanName(),
                membershipPlan.getDescription(),
                membershipPlan.getPrice(),
                membershipPlan.getDurationDays()
        );
    }
}
