import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import { LOCAL_STORAGE_CONSTANT } from "../../constant/LocalStorageConstant";
import { useUser } from "../../context/UserContext";
import { MenuItem } from "../../types/home";
import { MenuNavComponent } from "../components/MenuNavComponent";
import { getMenu } from "./../../service/HomeService";

const Header: React.FC = () => {
  const { userRole } = useUser();

  const location = useLocation();
  console.log(location);

  const [menus, setMenus] = useState<MenuItem[]>([]);

  const tokenValid = localStorage.getItem(LOCAL_STORAGE_CONSTANT.TOKEN);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu(); // data: MenuItem[]
        setMenus(data);
      } catch (error) {
        console.error("Failed to fetch menu", error);
      }
    };
    console.log("userRole: ", userRole);

    fetchMenu();
  }, [userRole]);
  const filteredMenus =
    userRole == LOCAL_STORAGE_CONSTANT.ROLE_ADMIN ? [] : menus;

  return (
    <header className="bg-white shadow-md px-4 flex items-center justify-between py-5">
      {/* Logo Section */}
      <Link to={PATH_CONSTANTS.ROOT.ROOT} className="flex items-center">
        <span className="text-orange-600 font-bold text-lg"></span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <MenuNavComponent menuItems={filteredMenus} />
      </nav>

      {/* Login Button */}
      <div className="flex items-center space-x-4">
        {tokenValid && (
          <Link to={PATH_CONSTANTS.SETTING.SETTING}>
            <CiUser size={20} />
          </Link>
        )}
        {!tokenValid && (
          <Link
            to={PATH_CONSTANTS.AUTH.LOGIN}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
