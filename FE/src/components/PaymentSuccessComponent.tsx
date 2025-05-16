import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URIS } from "../api/URIConstant";
import { http } from "../service/Http";

const PaymentSuccessComponent: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const query = searchParams.toString();
        const response = await http.get(
          `${API_URIS.PAYMENT.CALLBACK}?${query}`,
        );

        if (response.status === 200) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        setIsSuccess(false);
      }
    };

    fetchPaymentResult();
  }, [searchParams]);

  const renderContent = () => {
    if (isSuccess === null) {
      return <p className="text-gray-600">Đang xử lý thanh toán...</p>;
    }

    if (isSuccess) {
      return (
        <>
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Thanh toán thành công!
          </h3>
          <p className="text-gray-600 my-2">
            Cảm ơn bạn đã hoàn tất thanh toán trực tuyến an toàn.
          </p>
          <p>Chúc bạn một ngày tốt lành!</p>
        </>
      );
    }

    return (
      <>
        <h3 className="md:text-2xl text-base text-red-600 font-semibold text-center">
          Thanh toán thất bại!
        </h3>
        <p className="text-gray-600 my-2">
          Đã có lỗi xảy ra trong quá trình xử lý thanh toán.
        </p>
        <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
      </>
    );
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className={`w-16 h-16 mx-auto my-6 ${
            isSuccess === null
              ? "text-gray-400"
              : isSuccess
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          />
        </svg>
        <div className="text-center">
          {renderContent()}
          <div className="py-10 text-center">
            <a
              href="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              QUAY VỀ TRANG CHỦ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessComponent;
