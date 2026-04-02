import { apiEndpoints, StatusCode } from "@/constants/api";
// import { consultant_id, storeId } from "@/constants/constant";
import { apiInstance, handleErr, toLocalISOString } from "@/lib/utils";
import {
  AppointmentHistoryType,
  AppointmentType,
  SlotBookingType,
} from "@/models/schema";
import { APISnapshotType } from "@/models/types";

export const bookSlot = async (data: SlotBookingType) => {
  const to = new Date(data.time).setTime(
    new Date(data.time).getTime() + (data.slotDuration || 20) * 60 * 1000
  );
  try {
    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.appointMents.bookSlot.replace(
        ":consultantId",
        data.consultantId
      ),
      {
        consultantId: data.consultantId,
        date: toLocalISOString(data.date).slice(0, 10),
        from: toLocalISOString(data.time).slice(11, 19),
        to: toLocalISOString(new Date(to).toISOString()).slice(11, 19),
        storeId: data.storeId,
        // amount: data.amount,
        // discountAmt: data.discountAmt,
        // tax: data.tax,
        // totalAmt: data.totalAmt,
        addressId: data.addressId,
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
        age: data.age,
        gender: data.gender,
        comments: data.comments || null,
      }
    );
    if (response.data.status === StatusCode.CREATED) {
      return response.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getAppointments = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<AppointmentHistoryType[]> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      `${apiEndpoints.appointMents.getAppointments}?page=${page}&limit=${limit}`
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const getAppointmentById = async (
  appointmentId: string
): Promise<AppointmentType> => {
  try {
    const response = await apiInstance.get<APISnapshotType>(
      apiEndpoints.appointMents.getAppointmentById.replace(
        ":appointmentId",
        appointmentId
      )
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const response = await apiInstance.put<APISnapshotType>(
      apiEndpoints.appointMents.cancelAppointment.replace(
        ":appointmentId",
        appointmentId
      )
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.message;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const raiseComplaint = async (data: {
  complaintOn: string;
  title: string;
  description: string;
  type: string;
  storeId: string;
}) => {
  try {
    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.appointMents.raiseComplaint.replace(
        ":appointmentId",
        data.complaintOn
      ),
      {
        title: data.title,
        description: data.description,
        type: data.type,
        storeId: data.storeId,
        complaintOn: data.complaintOn,
      }
    );
    if (response.data.status === StatusCode.CREATED) {
      return response.data.message;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
};

export const setAppointmentRating = async (data: {
  appointmentId: string;
  consultRating: number;
  experienceRating: number;
  review: string | null;
}) => {
  try {
    const response = await apiInstance.put<APISnapshotType>(
      apiEndpoints.appointMents.rateAppointment.replace(
        ":appointmentId",
        data.appointmentId
      ),
      {
        consultRating: data.consultRating,
        experienceRating: data.experienceRating,
        review: data.review,
      }
    );
    if (response.data.status === StatusCode.OK) {
      return response.data.message;
    }
  } catch (error) {
    throw handleErr(error);
  }
};
