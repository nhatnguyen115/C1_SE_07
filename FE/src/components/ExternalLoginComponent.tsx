import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URIS } from "../api/URIConstant";
import { LOCAL_STORAGE_CONSTANT } from "../constant/LocalStorageConstant";
import { useUser } from "../context/UserContext";
import { http } from "../service/Http";
import { PATH_CONSTANTS } from "./../api/PathConstant";

type LoginResponse = {
  data: {
    token: string;
    role: string;
  };
  message: string;
  status: number;
};

const ExternalLoginComponent: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { setUserRole } = useUser();

  useEffect(() => {
    const handleExternalLogin = async () => {
      try {
        const response = await http.get(API_URIS.AUTH.EXTERNAL);

        const { token, role } = response.data.data;
        localStorage.setItem(LOCAL_STORAGE_CONSTANT.TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_CONSTANT.ROLE, role);
        setUserRole(response.data.role);

        setSuccess(true);

        setTimeout(() => {
          navigate(PATH_CONSTANTS.ROOT.ROOT);
        }, 3000);
      } catch (error) {
        console.error("External login failed:", error);
        setErrorMsg("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    };
    handleExternalLogin();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Đăng nhập với Google
        </h2>

        {errorMsg && (
          <p className="mt-4 text-center text-red-500">{errorMsg}</p>
        )}

        {success && (
          <div className="text-center">
            <p className="text-green-600 mb-4 font-medium">
              Đăng nhập thành công! Đang chuyển về trang chủ...
            </p>
            <button
              onClick={() => navigate(PATH_CONSTANTS.ROOT.ROOT)}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
            >
              Quay về trang chủ ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalLoginComponent;
