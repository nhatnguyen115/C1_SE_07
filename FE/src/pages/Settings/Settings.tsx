import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import { API_URIS } from "../../api/URIConstant";
import LeftSidebarUser from "../../components/LeftSidebarUser";
import { LOCAL_STORAGE_CONSTANT } from "../../constant/LocalStorageConstant";
import { http } from "../../service/Http";
import { UserType } from "../../types/user";

const Settings: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await http.get(API_URIS.USER.INFO);
        localStorage.setItem(
          LOCAL_STORAGE_CONSTANT.FULL_NAME,
          response.data.data.lastName + " " + response.data.data.firstName,
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <LeftSidebarUser customHeight="h-auto w-64" />

      {/* Form Cài đặt */}
      <div className="flex-1 bg-gray-50 flex justify-center pt-5 pb-96">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-blue-600 mb-6">
            Thông tin tài khoản
          </h1>

          {user ? (
            <form className="space-y-4">
              {/* Họ và tên */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={`${user.lastName} ${user.firstName}`}
                  className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={user.phoneNumber}
                  className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Nút Chỉnh sửa */}
              <div className="text-right pt-10">
                <Link
                  to={PATH_CONSTANTS.SETTING.ADD}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 inline-block text-center"
                >
                  Chỉnh sửa
                </Link>
              </div>
            </form>
          ) : (
            <p className="text-center text-gray-500">Đang tải thông tin...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
