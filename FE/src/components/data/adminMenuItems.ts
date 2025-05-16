import { FaFileAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import { AdminNavItemType } from "../../types/admin";

export const adminMenuItems: AdminNavItemType[] = [
  {
    label: "Thống kê",
    path: PATH_CONSTANTS.ADMIN.ADMIN_DASHBOARD,
    icon: FaTachometerAlt,
  },
  {
    label: "Người dùng",
    path: PATH_CONSTANTS.ADMIN.ADMIN_USERMANAGEMENT,
    icon: FaUsers,
  },
  {
    label: "Đề thi",
    path: PATH_CONSTANTS.ADMIN.TEST_MANAGEMENT,
    icon: FaFileAlt,
  },
  {
    label: "Chuyên đề",
    path: PATH_CONSTANTS.ADMIN.SECTION_MANAGEMENT,
    icon: FaFileAlt,
  },
  // {
  //   label: "Đăng xuất",
  //   path: PATH_CONSTANTS.AUTH.LOGOUT,
  //   icon: FaSignOutAlt,
  // },
];
