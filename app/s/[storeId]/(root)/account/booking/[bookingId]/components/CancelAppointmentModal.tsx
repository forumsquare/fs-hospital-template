import CustomDialog from "@/components/custom/CustomDialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CustomDrawer from "@/components/custom/CustomDrawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/custom/CustomInput";
import { CustomButton, SubmitButton } from "@/components/custom/CustomButtons";
import {
  useCancelAppointmentMutation,
  useRaiseComplaintMutation,
} from "@/services/query/appointmentQuery";
import { ReviewType } from "@/lib/enum";
import { Loader2 } from "lucide-react";

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  storeId: string;
}

interface ComplaintFormProps {
  bookingId: string;
  storeId: string;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
});

type FormType = z.infer<typeof formSchema>;

const ComplaintForm = ({ bookingId, storeId, onClose }: ComplaintFormProps) => {
  const { mutateAsync: raiseCompaint, isPending: complaintPending } =
    useRaiseComplaintMutation();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle complaint submission here
    console.log({ bookingId, ...values });
    await raiseCompaint({
      storeId: storeId,
      title: values.title,
      description: values.description,
      type: ReviewType.APPOINTMENTS,
      complaintOn: bookingId,
    });
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInput
          control={form.control}
          name="title"
          label="Subject"
          placeholder="Brief subject of your complaint"
          isTextArea={false}
          className="text-primary font-bold"
        />
        <CustomInput
          control={form.control as Control<FormType>}
          name="description"
          label="Description"
          placeholder="Briefly describe your complaint..."
          isTextArea={true}
          className="border text-primary"
        />

        <div className="flex justify-end gap-3">
          <CustomButton type="button" onClick={onClose}>
            Cancel
          </CustomButton>

          <SubmitButton disabled={complaintPending} type="submit">
            Submit Complaint{" "}
            {complaintPending && <Loader2 className="animate-spin" />}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default function CancelAppointmentModal({
  isOpen,
  onClose,
  bookingId,
  storeId,
}: ComplaintModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutateAsync: cancelBooking, isPending: cancelPending } =
    useCancelAppointmentMutation();

  const handleCancelAppointment = async (id: string) => {
    await cancelBooking(id);
    onClose();
  };

  return isMobile ? (
    <CustomDrawer
      open={isOpen}
      setOpen={onClose}
      //   title="Cancel Appointment"
      className="px-5 !rounded-t-3xl  "
    >
      <h2 className="text-lg font-bold mb-10">
        Are you sure? You want to cancel the Appointment.
      </h2>
      <div className="flex justify-end gap-3">
        <CustomButton type="button" onClick={onClose}>
          Cancel
        </CustomButton>

        <SubmitButton
          disabled={cancelPending}
          onClick={() => handleCancelAppointment(bookingId)}
        >
          Confirm {cancelPending && <Loader2 className="animate-spin" />}
        </SubmitButton>
      </div>
    </CustomDrawer>
  ) : (
    <CustomDialog
      open={isOpen}
      setOpen={onClose}
      //   title="Cancel Appointment"
      className="!max-w-xl !rounded-3xl"
    >
      <h2 className="text-xl font-bold mb-8">
        Are you sure? You want to cancel the Appointment.
      </h2>
      <div className="flex justify-end gap-3">
        <CustomButton type="button" onClick={onClose}>
          Cancel
        </CustomButton>

        <SubmitButton
          disabled={cancelPending}
          onClick={() => handleCancelAppointment(bookingId)}
        >
          Confirm {cancelPending && <Loader2 className="animate-spin" />}
        </SubmitButton>
      </div>
    </CustomDialog>
  );
}
