import { DropDownItemType, NavType, Rating } from "@/models/types";

export const genderList: DropDownItemType[] = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export const navList: NavType[] = [
  { href: "/", title: "Home" },
  { href: "/#doctors", title: "Doctors" },
  { href: "/specializations", title: "Specializations" },
  // { href: "/diagnostics", title: "Diagnostics" },
  { href: "/account", title: "Account" },
  { href: "/account/notifications", title: "Notifications" },
];
export const ratingColors: Record<Rating, { className: string }> = {
  worst: {
    className: "text-red-500 !transform !scale-110 hover:text-red-300 ",
  },
  medium: {
    className: "text-orange-500 !transform !scale-110 hover:text-orange-300 ",
  },
  okay: {
    className: "text-yellow-400 !transform !scale-110 hover:text-yellow-500 ",
  },
  good: {
    className: "text-blue-600 !transform !scale-110 hover:text-blue-500 ",
  },
  excellent: {
    className: "text-green-600 !transform !scale-110 hover:!text-green-100 ",
  },
};
