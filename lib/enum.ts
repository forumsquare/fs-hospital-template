export enum AuthType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum ReviewType {
  STORE = "STORE",
  APPOINTMENTS = "APPOINTMENTS",
  SERVICE = "SERVICE",
  BOOKING_EXPERIENCE = "BOOKING_EXPERIENCE",
}

export enum slotType {
  PENDING = "PENDING",
  BOOKED = "BOOKED",
  RUNNING = "RUNNING",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export const Ratings = {
  worst: 1,
  medium: 2,
  okay: 3,
  good: 4,
  excellent: 5,
};
