import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CustomDrawer from "@/components/custom/CustomDrawer";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/custom/CustomDialog";
import { CustomButton, SubmitButton } from "@/components/custom/CustomButtons";
import { Rating } from "@/models/types";
import { cn } from "@/lib/utils";
import { ratingColors } from "@/constants/list";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DrawerTitle } from "@/components/ui/drawer";
import { useSubmitReviewMutation } from "@/services/query/reviesQuery";
import { Loader2 } from "lucide-react";
import { useSetAppointmentRatingMutation } from "@/services/query/appointmentQuery";
import { Ratings } from "@/lib/enum";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  storeId: string;
}

const TerribleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 128 128"
    fill="currentColor"
  >
    <path
      d="M64 108C88.8528 108 109 87.8528 109 63C109 38.1472 88.8528 18 64 18C39.1472 18 19 38.1472 19 63C19 87.8528 39.1472 108 64 108Z"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <path
      d="M44 80C44 80 51 70 64 70C77 70 84 80 84 80"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="44" cy="50" r="6" fill="currentColor" />
    <circle cx="84" cy="50" r="6" fill="currentColor" />
    <path
      d="M35 45L53 35"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M93 45L75 35"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);

const BadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 128 128"
    fill="currentColor"
  >
    <path
      d="M64 108C88.8528 108 109 87.8528 109 63C109 38.1472 88.8528 18 64 18C39.1472 18 19 38.1472 19 63C19 87.8528 39.1472 108 64 108Z"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <path
      d="M44 83C44 83 51 77 64 77C77 77 84 83 84 83"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="44" cy="50" r="6" fill="currentColor" />
    <circle cx="84" cy="50" r="6" fill="currentColor" />
  </svg>
);

const GoodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 128 128"
    fill="currentColor"
  >
    <path
      d="M64 108C88.8528 108 109 87.8528 109 63C109 38.1472 88.8528 18 64 18C39.1472 18 19 38.1472 19 63C19 87.8528 39.1472 108 64 108Z"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <path
      d="M44 70C44 70 51 83 64 83C77 83 84 70 84 70"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="44" cy="50" r="6" fill="currentColor" />
    <circle cx="84" cy="50" r="6" fill="currentColor" />
  </svg>
);

const ExcellentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 128 128"
    fill="currentColor"
    className={className}
  >
    <path
      d="M64 108C88.8528 108 109 87.8528 109 63C109 38.1472 88.8528 18 64 18C39.1472 18 19 38.1472 19 63C19 87.8528 39.1472 108 64 108Z"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <path
      d="M44 70C44 70 51 90 64 90C77 90 84 70 84 70"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="44" cy="50" r="6" fill="currentColor" />
    <circle cx="84" cy="50" r="6" fill="currentColor" />
    <path
      d="M40 35L48 43"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M88 35L80 43"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const OkayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="35"
    height="40"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="neutralFaceIconTitle"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    className={className}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <title id="neutralFaceIconTitle">Neutral Face</title>{" "}
      <line strokeLinecap="round" x1="9" y1="9" x2="9" y2="9"></line>{" "}
      <line strokeLinecap="round" x1="15" y1="9" x2="15" y2="9"></line>{" "}
      <path d="M16,15 L8,15" opacity=".9"></path>{" "}
      <circle cx="12" cy="12" r="10"></circle>{" "}
    </g>
  </svg>
);

interface RatingFormProps {
  bookingId: string;
  onClose: () => void;
  storeId: string;
}
const RatingForm = ({ bookingId, onClose, storeId }: RatingFormProps) => {
  const [doctorRating, setDoctorRating] = useState<Rating>("excellent");
  const [experienceRating, setExperienceRating] = useState<Rating>("excellent");
  const [feedback, setFeedback] = useState("");
  const ratings = [
    { value: "worst" as Rating, Icon: TerribleIcon, label: "Terrible" },
    { value: "medium" as Rating, Icon: BadIcon, label: "Bad" },
    { value: "okay" as Rating, Icon: OkayIcon, label: "Okay" },
    { value: "good" as Rating, Icon: GoodIcon, label: "Good" },
    {
      value: "excellent" as Rating,
      Icon: ExcellentIcon,
      label: "Excellent",
    },
  ];

  const { mutateAsync: submitReview, isPending } =
    useSetAppointmentRatingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle rating submission here
    console.log({ bookingId, doctorRating, experienceRating, feedback });
    const data = {
      appointmentId: bookingId,
      consultRating: Ratings[doctorRating],
      experienceRating: Ratings[experienceRating],
      review: feedback ? feedback : null,
    };

    await submitReview(data);
    onClose();
  };

  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 p-3 pt-0">
        {/* <div> */}
        <div className="bg-primary  bg-clip-text text-transparent font-extrabold">
          Rate Your Doctor
        </div>
        <div className="flex justify-center gap-5">
          {ratings.map(({ value, Icon, label }) => {
            const colors = ratingColors[value];
            if (doctorRating === value) {
              console.log(colors);
            }
            return (
              <button
                type="button"
                key={value}
                onClick={() => setDoctorRating(value)}
                className={cn(
                  "flex flex-col items-center transition-all duration-300 text-neutral-400",
                  doctorRating === value && ` ${colors.className} scale-110`
                )}
              >
                <Icon />
                <span className={cn("mt-2 text-sm font-medium ")}>{label}</span>
              </button>
            );
          })}
        </div>
        <div className="bg-primary pt-5 bg-clip-text text-transparent font-extrabold ">
          Rate Your Booking Experience
        </div>
        <div className="flex justify-center gap-5 pb-5">
          {ratings.map(({ value, Icon, label }) => {
            const colors = ratingColors[value];
            if (experienceRating === value) {
              console.log(colors);
            }
            return (
              <button
                type="button"
                key={value}
                onClick={() => setExperienceRating(value)}
                className={cn(
                  "flex flex-col items-center transition-all duration-300 text-neutral-400",
                  experienceRating === value && ` ${colors.className} scale-110`
                )}
              >
                <Icon />
                <span className={cn("mt-2 text-sm font-medium ")}>{label}</span>
              </button>
            );
          })}
        </div>
        {/* </div> */}

        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your experience (optional)"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />

        <div className="flex justify-end gap-3">
          <CustomButton type="button" onClick={onClose}>
            Cancel
          </CustomButton>
          <SubmitButton disabled={isPending} type="submit">
            Submit Rating {isPending && <Loader2 className="animate-spin" />}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default function RatingModal({
  isOpen,
  onClose,
  bookingId,
  storeId,
}: RatingModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? (
    <CustomDrawer
      open={isOpen}
      setOpen={onClose}
      // title="Rate Your Appointment"
      className="px-3 !rounded-t-3xl"
    >
      <RatingForm bookingId={bookingId} storeId={storeId} onClose={onClose} />
    </CustomDrawer>
  ) : (
    <CustomDialog
      open={isOpen}
      setOpen={onClose}
      // title="Rate Your Appointment"
      className="px-3 !rounded-3xl"
      closeButton={false}
    >
      <RatingForm bookingId={bookingId} storeId={storeId} onClose={onClose} />
    </CustomDialog>
  );
}
