import { notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import { register } from "../../service/AuthService";
import { Gender, RegisterType } from "../../types/auth";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [name, setName] = useState(""); // State for name
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

  const [username, setUsername] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState<string | null>(null);

  // Trong component
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notification.error({
        message: "Mật khẩu không khớp!",
      });
      return;
    }

    const payload: RegisterType = {
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" "),
      gender,
      dob,
      email,
      phoneNumber,
      username,
      password,
    };

    try {
      const response = await register(payload);
      notification.success({
        message: response.message,
      });
      setTimeout(() => {
        navigate(PATH_CONSTANTS.AUTH.LOGIN);
      }, 2000);
    } catch (error: any) {
      notification.error({
        message: "Đăng ký thất bại. Vui lòng thử lại.",
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex max-w-4xl bg-white rounded-lg w-full overflow-hidden items-center">
        {/* Left Side - Welcome message and image */}
        <div className="flex-1 p-8 items-center ">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome, Looks like you’re new here!
          </h2>
          <div className="mt-4">
            <img
              src="src/assets/images/login-image.png"
              alt="illustration"
              className="w-full"
            />
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 p-8 bg-blue-100">
          <h2 className="text-3xl font-bold mb-6">Đăng ký</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="text-gray-700 text-sm font-medium"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="text-gray-700 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập username"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-medium"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 text-sm font-medium"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Nhớ mật khẩu
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Đăng ký
            </button>
          </form>

          {/* Already have an account? Link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Bạn đã có tài khoản?{" "}
              <Link
                className="text-blue-600 hover:underline"
                to={PATH_CONSTANTS.AUTH.REGISTER}
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
