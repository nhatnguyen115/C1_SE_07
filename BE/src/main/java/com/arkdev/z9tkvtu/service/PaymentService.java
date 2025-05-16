package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.util.VNPayConstant;
import com.arkdev.z9tkvtu.util.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPayUtils vnPayUtils;
    public String createPaymentUrl(@NotNull Integer price,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws IOException {
        String version = "2.1.0";
        String command = "pay";
        String orderType = "other";
        long amount = price * 100;

        String transactionReference = vnPayUtils.getRandomNumber(8); // Mã giao dịch
        String clientIpAddress = vnPayUtils.getIpAddress(request);

        String terminalCode = VNPayConstant.vnpTmnCode;

        Map<String, String> params = new HashMap<>();
        params.put("vnp_Version", version);
        params.put("vnp_Command", command);
        params.put("vnp_TmnCode", terminalCode);
        params.put("vnp_Amount", String.valueOf(amount));
        params.put("vnp_CurrCode", "VND");

        params.put("vnp_BankCode", "NCB");
        params.put("vnp_TxnRef", transactionReference);
        params.put("vnp_OrderInfo", "Thanh toan don hang:" + transactionReference);
        params.put("vnp_OrderType", orderType);
        params.put("vnp_Locale", "vn");

        params.put("vnp_ReturnUrl", VNPayConstant.vnpReturnUrl);
        params.put("vnp_IpAddr", clientIpAddress);

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String createdDate = dateFormat.format(calendar.getTime());
        params.put("vnp_CreateDate", createdDate);

        calendar.add(Calendar.MINUTE, 15);
        String expirationDate = dateFormat.format(calendar.getTime());
        params.put("vnp_ExpireDate", expirationDate);

        List<String> sortedFieldNames = new ArrayList<>(params.keySet());
        Collections.sort(sortedFieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder queryData = new StringBuilder();

        for (Iterator<String> iterator = sortedFieldNames.iterator(); iterator.hasNext();) {
            String fieldName = iterator.next();
            String fieldValue = params.get(fieldName);

            if (fieldValue != null && !fieldValue.isEmpty()) {
                hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                queryData.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII))
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (iterator.hasNext()) {
                    hashData.append('&');
                    queryData.append('&');
                }
            }
        }

        String secureHash = vnPayUtils.hmacSHA512(VNPayConstant.secretKey, hashData.toString());
        queryData.append("&vnp_SecureHash=").append(secureHash);
//        response.sendRedirect(VNPayConstant.vnpPayUrl + "?" + queryData);
        return VNPayConstant.vnpPayUrl + "?" + queryData;
    }
}
