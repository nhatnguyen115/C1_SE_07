import { API_URIS } from "../api/URIConstant";
import { MenuItem } from "../types/home";
import { buildMenuItems } from "../utils/buildMenuTree";
import { httpNoAuth } from "./Http";

export const getMenu = async (): Promise<MenuItem[]> => {
  try {
    const response = await httpNoAuth.get<{ data: MenuItem }>(
      API_URIS.MENU.GET_ALL,
    );
    const rootMenu = response.data.data;
    return buildMenuItems(rootMenu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};
