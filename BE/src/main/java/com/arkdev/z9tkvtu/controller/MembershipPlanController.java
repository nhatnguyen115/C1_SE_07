package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.MembershipPlanRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.MembershipPlanService;
import com.arkdev.z9tkvtu.util.Pagination;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/membership-plans")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MembershipPlanController {
    MembershipPlanService membershipPlanService;

    @GetMapping("")
    public ResponseData<?> getMembershipPlans() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Membership Plans Successfully",
                    membershipPlanService.getMembershipPlans());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Membership Plans Failed");
        }
    }

    @PostMapping("")
    public ResponseData<?> addMembershipPlan(@RequestBody MembershipPlanRequest request) {
        try {
            membershipPlanService.addMembershipPlan(request);
            return new ResponseData<>(HttpStatus.CREATED.value(), "Add Membership Plan Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Add Membership Plan Failed");
        }
    }

    @PutMapping("/{planId}")
    public ResponseData<?> updateMembershipPlan(@PathVariable Integer planId, @RequestBody MembershipPlanRequest request) {
        try {
            membershipPlanService.updateMembershipPlan(planId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Membership Plan Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Update Membership Plan Failed");
        }
    }

    @DeleteMapping("/{planId}")
    public ResponseData<?> deleteMembershipPlan(@PathVariable Integer planId) {
        try {
            membershipPlanService.deleteMembershipPlan(planId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Membership Plan Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Delete Membership Plan Failed");
        }
    }
}
