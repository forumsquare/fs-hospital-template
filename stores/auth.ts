import { create } from "zustand";

type State = {
  showOTP: boolean;
  phoneNumber: string;
  otpId: string;
};


type Actions = {
  setShowOTP: (showOTP: boolean) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setOtpId: (otpId: string) => void;
};

const initialState: State = {
  showOTP: false,
  phoneNumber: "",
  otpId: "",
};

const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  setShowOTP: (showOTP) => set((_) => ({ showOTP })),
  setPhoneNumber: (phoneNumber) => set((_) => ({ phoneNumber })),
  setOtpId: (otpId) => set((_) => ({ otpId })),
}));

export default useAuthStore;
