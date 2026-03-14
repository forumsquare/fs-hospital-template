import { getOnlyDate } from "@/lib/utils";
import { DoctorDetailsType, PatientInfoType } from "@/models/schema";
import { DoctorInfo } from "@/models/types";
import { create } from "zustand";

type AddressType = {
  id: string;
  name: string | undefined;
};
type State = {
  bookingAddress?: AddressType;
  bookingDate: Date;
  bookingTime?: Date;
  index: number;
  doctorInfo?: DoctorDetailsType;
  patientInfo?: PatientInfoType;
};

type Actions = {
  setIndex: (index: number) => void;
  setBookingDate: (date: Date) => void;
  setBookingTime: (date: Date | undefined) => void;
  setBookingAddress: (address: AddressType) => void;
  setDocInfo: (doc: DoctorDetailsType) => void;
  setPatientInfo: (patient: PatientInfoType) => void;
  reset: () => void;
};

const initialState: State = {
  index: 0,
  bookingDate: getOnlyDate(),
  bookingAddress: {
    id: "1",
    name: "23-78/129, 12, E Anandbagh Main Rd,RK Nagar Colony, East anandhbagh, Hyderabad, Telangana, india, 500047",
  },
};

export const useBookingStore = create<State & Actions>((set) => ({
  ...initialState,
  setIndex: (index) => set((_) => ({ index })),
  setDocInfo: (doc) => set((_) => ({ doctorInfo: doc })),
  setBookingTime: (time) => set((_) => ({ bookingTime: time })),
  setBookingDate: (date) => set((_) => ({ bookingDate: getOnlyDate(date) })),
  setPatientInfo: (patient) => set((_) => ({ patientInfo: patient })),
  reset: () =>
    set((_) => {
      return {
        bookingDate: getOnlyDate(),
        bookingTime: undefined,
        index: 0,
        doctorInfo: undefined,
        patientInfo: undefined,
      };
    }),
  setBookingAddress: (address) => set((_) => ({ bookingAddress: address })),
}));
