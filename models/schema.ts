import { ReviewType as ReviewEnum, slotType } from "@/lib/enum";
import { Description } from "@radix-ui/react-dialog";
import { date, z } from "zod";

export const AddressSchema = z.object({
  id: z.string(),
  address: z.string(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipcode: z.string(),
  lat: z.string().nullable().optional(),
  lng: z.string().nullable().optional(),
  contactMail: z.string().email().nullable().optional(),
  contactNo: z.string().nullable().optional(),
});



export type AddressType = z.infer<typeof AddressSchema>;

export const MediaSchema = z.object({
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  x: z.string().url().optional(),
  youtube: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  whatsapp: z.string().url().optional(),
});

export type SocialMediaType = z.infer<typeof MediaSchema>;

const TimingSchema = z.object({
  0: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
  1: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
  2: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
  3: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
  4: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
  5: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
  6: z.array(z.object({ from: z.string(), to: z.string() })).optional(),
});

export const StoreInfoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  logo: z.string().nullable(),
  tagline: z.string().nullable(),
  about: z.string().nullable(),
  email: z.string().email().nullable().optional(),
  phoneNo: z.string().nullable().optional(),
  socialMedia: MediaSchema.nullable().optional(),
  addressList: z.array(AddressSchema),
  media: z.array(z.object({
    url: z.string().url(),
    type: z.enum(["IMAGE", "CERTIFICATE"]),
  })),
  rating: z.string().nullable().optional(),
  ratingCount: z.string().nullable().optional(),
  timings: z.array(z.object({
    day: z.number(),
    fromTime: z.string(),
    toTime: z.string(),
  })).optional(),
});

export type StoreInfoType = z.infer<typeof StoreInfoSchema>;

export const PatientInfoSchema = z.object({
  name: z
    .string()
    .min(3, "Enter minimum 3 characters")
    .max(50, "Enter maximum 50 characters"),
  phone: z.string().regex(/^\d{10}$/, "Invalid Phone Number"),
  email: z.union([z.string().email("Invalid Email").optional(), z.literal("")]),
  age: z
    .string()
    .refine((value) => parseInt(value) < 150, "Age must be less than 150"),
  gender: z.enum(["MALE", "FEMALE"]),
  comment: z.string().optional(),
});

export type PatientInfoType = z.infer<typeof PatientInfoSchema>;

export const TestimonialSchema = z.object({
  id: z.string(),
  userName: z.string(),
  rating: z.string(),
  testimonial: z.string().min(20).max(150),
  storeId: z.string(),
  storeName: z.string(),
});

export type TestimonialType = z.infer<typeof TestimonialSchema>;

export const SpecialisationSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  descriptionUrl: z.string().url(),
  images: z.array(z.string().url()).min(1).max(4),
  addOnDescription: z.string().max(200).optional(),
});

export type SpecialisationType = z.infer<typeof SpecialisationSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  specializationId: z.string(),
});

export type CategoryType = z.infer<typeof CategorySchema>;


export const TreatmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(),
  amount: z.number().optional(),
  discount: z.number().optional(),
  description: z.string().max(250),
});

export type TreatmentType = z.infer<typeof TreatmentSchema>;

export const ProcedureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  cost: z.string(),
  discount: z.string(),
  specializations: z.array(z.string()),
  storeId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  isActive: z.boolean(),
});

export type ProcedureType = z.infer<typeof ProcedureSchema>;

const FacilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
});

export type FacilityType = z.infer<typeof FacilitySchema>;

// export const BookingDetailsSchema = z.object({
//   id: z.string(),
//   createdOn: z.string(),
//   comments: z.string(),
//   status: z.string(),
//   slotTime: z.string(),
//   slotDay: z.string(),
//   fee: z.number(),
//   paymentStatus: z.string(),
//   referenceNo: z.string(),
//   userId: z.string(),
//   memberId: z.string(),
//   userInfo: z.object({
//     name: z.string(),
//     age: z.string(),
//     gender: z.string(),
//     phone: z.string(),
//     email: z.string(),
//   }),
//   memberInfo: z.object({
//     name: z.string(),
//     specialisation: z.string(),
//     experience: z.string(),
//     address: z.string(),
//   }),
//   hospitalInfo: z.object({
//     id: z.string(),
//     name: z.string(),
//     address: z.string(),
//     phone: z.string(),
//     email: z.string().email(),
//     createdOn: z.string(),
//   }),
// });

// export type BookingDetailType = z.infer<typeof BookingDetailsSchema>;

const DoctorSchema = z.object({
  id: z.string(),
  // slugId: z.string(),
  name: z.string(),
  image: z.string(),
  // rating: z.object({
  //   value: z.number().min(0).max(5),
  //   totalCount: z.number().int(),
  // }),
  rating: z.string(),
  ratingCount: z.string(),
  fee: z.string(),
  // specializationName: z.string(),
  experience: z.string(),
  // description: z.any(),
  discountAmt: z.string(),
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  // languages: z.array(z.string()),
  // timings: TimingSchema,
  // qualification: z.string(),
  // registrationNo: z.string(),
  // isAvailable: z.boolean(),
  // slotDuration: z.number(),
  // specialisations: z.array(z.string()),
  // accuracy: z.number().min(0).max(100),
});
export type DoctorType = z.infer<typeof DoctorSchema>;

export const DoctorDetailsSchema = DoctorSchema.extend({
  storeId: z.string(),
  description: z.string(),
  education: z.string(),
  slotDuration: z.number(),
  metaData: z.string().nullable(),
  bookingAccuracy: z.number().optional(),
  registrationNo: z.string().optional(),
  languages: z.array(z.string()),
});
export type DoctorDetailsType = z.infer<typeof DoctorDetailsSchema>;

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .length(10, { message: "Enter 10 digit mobile number" })
    .regex(/^[0-9]{10}$/, { message: "Only numbers are allowed" }),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  authType: z.string().optional(),
  dob: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return null;
      const date = new Date(val);
      return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
    }),
  gender: z.string().optional().nullable(),
});

export type UserType = z.infer<typeof UserSchema>;

export const AppointmentHistorySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(Object.values(slotType) as [string, ...string[]]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  from: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  to: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  amount: z.string(),
  phoneNo: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  totalAmt: z.string(),
  storeId: z.string().uuid(),
  storeName: z.string(),
  consultantName: z.string(),
  reviewId: z.string().optional(),
});

export type AppointmentHistoryType = z.infer<typeof AppointmentHistorySchema>;

export const ReviewSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Name is required"),
  rating: z
    .string()
    .refine((value) => parseInt(value) >= 1, "Rating must be at least 1")
    .refine((value) => parseInt(value) <= 5, "Rating must be at most 5"),
  review: z.string().nonempty("Review content is required"),
  date: z.date(),
  doctorId: z.string(),
  doctorName: z.string(),
  reviewId: z.string(),
});

export type ReviewType = z.infer<typeof ReviewSchema>;

export const HospitalInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  createdOn: z.string(),
});

export type HospitalInfoType = z.infer<typeof HospitalInfoSchema>;

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  type: z.enum(Object.values(ReviewEnum) as [string, ...string[]]),
  data: z.object({
    id: z.string(),
  }),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export type NotificationType = z.infer<typeof NotificationSchema>;

export const MessageSchema = z.object({
  storeId: z.string().uuid(),
  chatId: z.string().uuid(),
  message: z.string(),
});

export type MessageType = z.infer<typeof MessageSchema>;

export const SlotBookingSchema = z.object({
  consultantId: z.string(),
  date: z.string(),
  time: z.string(),
  storeId: z.string(),
  amount: z.string(),
  discountAmt: z.string().nullable(),
  tax: z.string().nullable(),
  totalAmt: z.string(),
  addressId: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  phoneNo: z.string(),
  age: z.string(),
  gender: z.string(),
  comments: z.string().optional(),
  slotDuration: z.number().optional(),
});

export type SlotBookingType = z.infer<typeof SlotBookingSchema>;

export const AppointmentAddressSchema = z.object({
  address: z.string(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  contactNo: z.string().nullable(),
  contactMail: z.string().nullable(),
});

export type AppointmentAddressType = z.infer<typeof AppointmentAddressSchema>;

export const AppointmentStoreSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: AppointmentAddressSchema,
});
export type AppointmentStoreType = z.infer<typeof AppointmentStoreSchema>;

export const AppointmentConsultantSchema = z.object({
  name: z.string(),
  categories: z.array(z.string()),
});
export type AppointmentConsultantType = z.infer<
  typeof AppointmentConsultantSchema
>;

export const AppointmentSchema = z.object({
  id: z.string().uuid(),
  bookingId: z.string(),
  status: z.enum(Object.values(slotType) as [string, ...string[]]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  from: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  to: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  name: z.string(),
  phoneNo: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  totalAmt: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  age: z.string(),
  reviewId: z.string().optional(),
  comments: z.string().optional(),
  amount: z.string(),
  discountAmt: z.string().nullable(),
  createdAt: z.string().datetime(),
  store: AppointmentStoreSchema,
  consultant: AppointmentConsultantSchema,
});

export type AppointmentType = z.infer<typeof AppointmentSchema>;

export const UserReviewSchema = z.object({
  id: z.string().uuid(),
  rating: z.string(),
  review: z.string(),
  createdAt: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export type UserReviewType = z.infer<typeof UserReviewSchema>;
