package com.arkdev.z9tkvtu.util;

import org.springframework.beans.factory.annotation.Value;

public class VNPayConstant {
    public static final String vnpPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static final String vnpReturnUrl = "http://localhost:3000/user-memberships/payment/callback";
    public static final String vnpTmnCode = "OMZF7JB7";
    public static final String secretKey = "J6S80U7KQ2LKSIK0Q8QJK6K8LVVGPUVD";
    public static final String vnpApiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
}
