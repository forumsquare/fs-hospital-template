import { CustomSelect } from "@/components/custom/CustomSelect";
import CustomTextField from "@/components/custom/CustomTextField";
import { InputIcon } from "@/components/custom/ServerComponents";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { genderList } from "@/constants/list";
import { cn } from "@/lib/utils";
import { PatientInfoSchema, PatientInfoType } from "@/models/schema";
import { useBookingStore } from "@/stores/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BookingInfo } from "./BookingInfo";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/serverCom";
import { useRouter } from "next/navigation";
import AskForLogin from "@/components/custom/AskForLogin";

const PatientInfoForm = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userInfo = await getCookie("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
      setLoading(false);
    })();
  }, []);

  const router = useRouter();
  const { setIndex, setPatientInfo, patientInfo } = useBookingStore();

  const form = useForm<PatientInfoType>({
    resolver: zodResolver(PatientInfoSchema),
    defaultValues: {
      ...patientInfo,
    },
    mode: "onSubmit",
  });

  const handleSubmit = (value: PatientInfoType) => {
    console.log("value >>>>>>>>>>>>>>>>", value);
    setPatientInfo(value);
    setIndex(3);
  };

  const bookStore = useBookingStore();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/signup");
  //     setIndex(0);
  //   }
  // }, []);

  return (
    <Form {...form}>
      {!loading && !user && (
        <AskForLogin
          onCancel={() => setIndex(0)}
          onSubmit={() => setIndex(0)}
          title="Login to book appointment"
        />
      )}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 p-3 py-10 lg:py-0 w-full"
      >
        {/* <BookingInfo /> */}
        <h2 className="text-3xl font-bold text-center">Patient Details</h2>
        <CustomTextField
          control={form.control}
          label="Name"
          placeholder="Enter full name"
          name="name"
          leading={<InputIcon src="/icons/account.svg" alt="name" />}
        />
        <div className="flex flex-col md:flex-row gap-5">
          <CustomTextField
            control={form.control}
            label="Mobile Number"
            placeholder="**********"
            leading={
              <span className="text-sm text-slate-700 font-semibold">+91</span>
            }
            name="phone"
            type="number"
          />
          <CustomTextField
            control={form.control}
            label="Email"
            subLabel="(optional)"
            placeholder="****@gmail.com"
            name="email"
            leading={<InputIcon src="/icons/email.svg" alt="email" />}
            required={false}
          />
        </div>
        <div className="flex gap-x-5">
          <CustomTextField
            control={form.control}
            label="Age"
            placeholder="**********"
            name="age"
            type="number"
            // max={150}
            onChange={(e) => {
              if (e.target.value.length >= 3) {
                if (parseInt(e.target.value) > 150) {
                  e.target.value = e.target.value.slice(0, 2);
                }
                e.target.value = e.target.value.slice(0, 3);
                form.setValue("age", e.target.value);
              }
            }}
          />
          <CustomSelect
            control={form.control}
            label="Gender"
            placeholder="Gender"
            name="gender"
            items={genderList}
          />
        </div>
        <CustomTextField
          control={form.control}
          label="Comment"
          subLabel="(optional)"
          placeholder="Enter additional information"
          showTextArea
          name="comment"
        />
        <div className="flex pb-14 lg:pb-3 px-5 gap-x-3 w-full">
          <Button
            onClick={() => bookStore.setIndex(0)}
            variant={"secondary"}
            type="button"
            className={cn([
              "flex-1 font-extrabold text-orange-600 bg-gradient-to-tr from-orange-200 to-red-100 shadow-none w-full",
            ])}
          >
            Back
          </Button>
          <Button
            variant={"default"}
            type="submit"
            className={cn([
              "flex-1 font-extrabold  bg-gradient-to-tr from-green-500 to-green-700 border-green-600 border-2 text-green-50 shadow-sm w-full",
            ])}
          >
            Book Now
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientInfoForm;
