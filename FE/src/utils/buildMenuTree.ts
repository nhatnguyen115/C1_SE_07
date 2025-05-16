import { MenuItem } from "../types/home";

// Hàm đệ quy để map raw item về MenuItem chuẩn
const mapMenuItem = (item: MenuItem): MenuItem => ({
  id: item.id,
  menuCode: item.menuCode,
  label: item.label,
  url: item.url,
  description: item.description,
  icon: item.icon,
  itemId: item.itemId,
  children: item.children.map(mapMenuItem),
});

// Hàm build tree từ root
export const buildMenuItems = (root: MenuItem): MenuItem[] => {
  return root.children.map(mapMenuItem);
};

// Gọi API và build lại tree
