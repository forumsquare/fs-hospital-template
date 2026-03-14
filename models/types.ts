export type DropDownItemType = {
  value: string;
  label: string;
};

export type DoctorInfo = {
  name: string;
  id: string;
  specialisation: string;
};

export type NavType = {
  title: string;
  href: string;
};

export type Rating = "worst" | "medium" | "okay" | "good" | "excellent";

export type APISnapshotType = {
  status?: number;
  message?: string;
  data?: any;
};
