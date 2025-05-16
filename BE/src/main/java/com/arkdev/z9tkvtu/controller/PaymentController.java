package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

//    @GetMapping("")
//    public ResponseData<?> getPayment(HttpServletRequest req) {
//        try {
//
//            return new ResponseData<>(HttpStatus.OK.value(), "Get Payment Successfully",
//                    paymentService.createPaymentUrl(req));
//        } catch (Exception e) {
//            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Payment Failed");
//        }
//    }
}
