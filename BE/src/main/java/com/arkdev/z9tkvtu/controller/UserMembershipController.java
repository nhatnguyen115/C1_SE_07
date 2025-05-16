package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.UserMembershipService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-memberships")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserMembershipController {
    UserMembershipService userMembershipService;

    @GetMapping("")
    public ResponseData<?> registerMembership(@RequestParam Integer planId,
                                              HttpServletRequest request,
                                              HttpServletResponse response) {
        try {
            String url = userMembershipService.registerMembership(planId, request, response);
            return new ResponseData<>(HttpStatus.OK.value(), "Register successfully",url);
        }catch (Exception ex){
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Register failed");
        }
    }

    @GetMapping("/payment/callback")
    public ResponseData<?> getPaymentCallback(@RequestParam("vnp_ResponseCode") String responseCode) {
        try {
            if (responseCode.equals("00")) {
                userMembershipService.confirmMembership();
                return new ResponseData<>(HttpStatus.OK.value(), "Confirm Membership successfully");
            } else  {
                return new ResponseData<>(HttpStatus.BAD_REQUEST.value(), "Transaction failed");
            }
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Confirm Membership failed");
        }
    }
}
