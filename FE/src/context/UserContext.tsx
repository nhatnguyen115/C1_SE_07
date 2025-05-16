// UserContext.tsx
import React, { createContext, useContext, useState } from "react";
import { LOCAL_STORAGE_CONSTANT } from "../constant/LocalStorageConstant";

interface UserContextType {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  userRole: null,
  setUserRole: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_CONSTANT.ROLE),
  );

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
