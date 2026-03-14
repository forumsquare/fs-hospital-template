import { apiEndpoints } from "@/constants/api";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bookSlot,
  cancelAppointment,
  getAppointmentById,
  getAppointments,
  raiseComplaint,
  setAppointmentRating,
} from "../api/appointments";
import { toast } from "sonner";
import { AppointmentHistoryType, SlotBookingType } from "@/models/schema";
import { slotType } from "@/lib/enum";

export const useBookSlotMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.appointMents.bookSlot),
    mutationFn: (data: SlotBookingType) => bookSlot(data),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: qKey(apiEndpoints.appointMents.getAppointments),
      // });
      toast.success(data.message);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};

export const useGetAppointmentsQuery = (data: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: qKey(apiEndpoints.appointMents.getAppointments),
    queryFn: () => getAppointments(data),
  });
};

export const useGetAppointmentByIdQuery = (id: string) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.appointMents.getAppointmentById, id]),
    queryFn: () => getAppointmentById(id),
  });
};

export const useCancelAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.appointMents.cancelAppointment),
    mutationFn: (id: string) => cancelAppointment(id),
    onSuccess: (data, variables) => {
      toast.success(data);
      const appointments = queryClient.getQueryData<AppointmentHistoryType[]>(
        qKey(apiEndpoints.appointMents.getAppointments)
      );
      if (appointments) {
        queryClient.setQueryData(
          qKey(apiEndpoints.appointMents.getAppointments),
          (oldData: AppointmentHistoryType[]) => {
            return oldData.map((item) =>
              item.id === variables
                ? { ...item, status: slotType.CANCELLED }
                : item
            );
          }
        );
      }

      const appointment = queryClient.getQueryData<AppointmentHistoryType>(
        qKey([apiEndpoints.appointMents.getAppointmentById, variables])
      );
      if (appointment) {
        queryClient.setQueryData(
          qKey([apiEndpoints.appointMents.getAppointmentById, variables]),
          (oldData: AppointmentHistoryType) => {
            return { ...oldData, status: slotType.CANCELLED };
          }
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: qKey([
            apiEndpoints.appointMents.getAppointmentById,
            variables,
          ]),
        });
      }
    },
  });
};

export const useRaiseComplaintMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.appointMents.raiseComplaint),
    mutationFn: (data: {
      complaintOn: string;
      title: string;
      description: string;
      type: string;
      storeId: string;
    }) => raiseComplaint(data),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: qKey(apiEndpoints.appointMents.getAppointments),
      // });
      toast.success("Complaint raised successfully");
    },
  });
};

export const useSetAppointmentRatingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.appointMents.rateAppointment),
    mutationFn: (data: {
      appointmentId: string;
      consultRating: number;
      experienceRating: number;
      review: string | null;
    }) => setAppointmentRating(data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        qKey(apiEndpoints.appointMents.getAppointments),
        (oldData: AppointmentHistoryType[]) => {
          return oldData.map((item) => {
            if (item.id === variables.appointmentId) {
              return { ...item, reviewId: "id" };
            }
            return item;
          });
        }
      );
      toast.success("Thanks for your valuable feedback");
    },
    onError: (e) => {
      // console.log({ e });
      toast.error(e.message ?? "Something went wrong");
    },
  });
};
