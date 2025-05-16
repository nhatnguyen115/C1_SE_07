import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { IoPlayForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import { API_URIS } from "../../api/URIConstant";
import ConfirmDialogComponent from "../../components/ConfirmDialogComponent";
import { http } from "../../service/Http";
import { MembershipPlan } from "../../types/payment";

const PaymentPage: React.FC = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const [planId, setPlanId] = useState<number>(0);

  const handleSubscribe = async (planId: number) => {
    try {
      const response = await http.get(API_URIS.PAYMENT.SUBSCRIBE(planId));
      if (response.data.status == 500) {
        notification.error({
          message: response.data.message,
        });
      } else {
        const paymentUrl = response.data.data;
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký gói:", error);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await http.get(API_URIS.PAYMENT.PLAN);
        setPlans(response.data.data || []);
      } catch (error) {
        console.error("Error fetching membership plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const renderPlanCard = (plan: MembershipPlan, index: number) => {
    const isHighlighted = index === 0; // Chọn thẻ đầu làm nổi bật (tuỳ chỉnh theo nhu cầu)
    const originalPrice = plan.price + 50000; // Giá gạch bỏ giả định
    const durationInMonths = Math.round(plan.durationDays / 30);
    const discountPercent = Math.round(
      100 - (plan.price / originalPrice) * 100,
    );
    return (
      <div
        key={plan.id}
        className={`p-6 ${
          isHighlighted
            ? "bg-blue-50 border-blue-500"
            : "bg-gray-100 border-gray-400"
        } border rounded-lg text-center shadow-md`}
      >
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-blue-600">
            {durationInMonths} tháng
          </h3>
          <p className="text-lg text-gray-700 line-through">
            {originalPrice.toLocaleString("vi-VN")}đ/tháng
          </p>
          <p className="text-xl font-semibold text-blue-600">
            {plan.price.toLocaleString("vi-VN")}đ/tháng
          </p>
        </div>
        <button
          onClick={() => {
            setShowConfirm(true);
            setPlanId(plan.id);
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 w-full inline-block"
        >
          Tiết kiệm {discountPercent}%
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-5">
      {/* Content */}
      <div className="max-w-4xl w-full mt-10 bg-white shadow-lg rounded-lg p-6">
        <div className="text-center justify-start pb-10">
          <span className="text-[#1c1c1c] text-[40px] font-bold font-josefin-sans">
            Trải nghiệm học tập không giới hạn cùng gói{" "}
          </span>
          <span className="text-[#3364e1] text-[40px] font-bold font-josefin-sans">
            Premium
          </span>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-3 gap-6 mb-6 pb-6">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
          {plans.map((plan, index) => renderPlanCard(plan, index))}
          {/* </div> */}
        </div>

        <ConfirmDialogComponent
          isOpen={showConfirm}
          title="Xác nhận đăng ký"
          message="Bạn có muốn đăng ký gói này không?"
          onConfirm={() => {
            handleSubscribe(planId);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />

        {/* Description Section */}
        <div className=" p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Học tập hiệu quả hơn
          </h3>

          <div className="space-y-4">
            {/* Mục 1 */}
            <div className="flex items-start space-x-4">
              <IoPlayForward className="text-green-500 text-2xl" />
              <div>
                <p className="font-medium text-gray-800">
                  Truy cập toàn bộ bài học
                </p>
                <p className="text-sm text-gray-600">
                  Học mọi lúc, mọi nơi với kho bài học đầy đủ.
                </p>
              </div>
            </div>

            {/* Mục 2 */}
            <div className="flex items-start space-x-4">
              <GiBrain className="text-pink-500 text-2xl" />
              <div>
                <p className="font-medium text-gray-800">
                  Công cụ luyện tập toàn diện
                </p>
                <p className="text-sm text-gray-600">
                  Luyện tập hiệu quả với các bài tập được cá nhân hóa.
                </p>
              </div>
            </div>

            {/* Mục 3 */}
            <div className="flex items-start space-x-4">
              <FaComments className="text-blue-500 text-2xl" />
              <div>
                <p className="font-medium text-gray-800">
                  Nhận phản hồi nhanh chóng & chính xác
                </p>
                <p className="text-sm text-gray-600">
                  Học hiệu quả và cải thiện kỹ năng nhanh chóng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign-up Button */}
        <div className="text-center pt-10 pb-10">
          <Link
            to={PATH_CONSTANTS.PAYMENT.FORM}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
