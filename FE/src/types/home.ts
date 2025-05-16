export type MenuItem = {
  id: number;
  menuCode: string;
  label: string;
  url: string;
  description: string | null;
  icon: string;
  itemId: number;
  children: MenuItem[];
};
