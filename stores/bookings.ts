"use client";

import { AppointmentHistoryType } from "@/models/schema";
import { create } from "zustand";

type State = {
  bookingHistory: AppointmentHistoryType[];
};

type Actions = {
  setBookingHistory: (history: AppointmentHistoryType[]) => void;
  cancelAppointment: (id: string) => void;
  rateAppointment: (id: string, rating: number) => void;
  raiseComplaint: (id: string, complaint: string) => void;
};

const initialState: State = {
  bookingHistory: [],
};

export const useBookingHistory = create<State & Actions>()((set) => ({
  ...initialState,
  setBookingHistory: (history) => set((state) => ({ bookingHistory: history })),
  cancelAppointment: (id) =>
    set((state) => ({
      bookingHistory: state.bookingHistory.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "rejected" as const }
          : appointment
      ),
    })),
  rateAppointment: (id, rating) =>
    set((state) => ({
      bookingHistory: state.bookingHistory.map((appointment) =>
        appointment.id === id ? { ...appointment, rating } : appointment
      ),
    })),
  raiseComplaint: (id, complaint) =>
    set((state) => ({
      bookingHistory: state.bookingHistory.map((appointment) =>
        appointment.id === id
          ? { ...appointment, complaints: complaint }
          : appointment
      ),
    })),
}));
