import { create } from "zustand";

type State = {
  showOTP: boolean;
  phoneNumber: string;
};


type Actions = {
  setShowOTP: (showOTP: boolean) => void;
  setPhoneNumber: (phoneNumber: string) => void;
};

const initialState: State = {
  showOTP: false,
  phoneNumber: "",
};

const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  setShowOTP: (showOTP) => set((_) => ({ showOTP })),
  setPhoneNumber: (phoneNumber) => set((_) => ({ phoneNumber })),
}));

export default useAuthStore;
