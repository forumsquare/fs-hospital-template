import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/stores/booking";
import { Card } from "@/components/ui/card";
import { Check, MapPin } from "lucide-react";
import { useGetConsultantAddressesQuery } from "@/services/query/doctorQuery";

const AddressCard = ({
  content,
  checked,
  className,
}: {
  className?: string;
  content: string | undefined;
  checked?: boolean;
}) => {
  return (
    <div className={cn("w-full flex items-center space-x-3 p-3", className)}>
      <MapPin className="size-10  text-primary/80 self-start" />
      <div className="text-sm text-start">{content}</div>
      {/* {checked && <Check className="size-8  text-green-500" />} */}
    </div>
  );
};
const AddressSelector = ({ doctorId }: { doctorId: string }) => {
  const { bookingAddress, setBookingAddress } = useBookingStore();
  const [items, setItems] = useState<{ value: string; label: string }[]>([]);

  const { data: addresses } = useGetConsultantAddressesQuery(doctorId);


  useEffect(() => {
    if (addresses) {
      const newItems = addresses.map((address) => ({
        value: address.id,
        label: `${address.address}, ${address.area}, ${address.city}, ${address.state}, ${address.country}, ${address.zipcode}`,
      }));
      setItems(newItems);
      setBookingAddress({
        id: addresses[0].id,
        name: `${addresses[0].address}, ${addresses[0].area}, ${addresses[0].city}, ${addresses[0].state}, ${addresses[0].country}, ${addresses[0].zipcode}`,
      });
    }
  }, [addresses, setBookingAddress]);

  return (
    <div className="space-y-3 border-b border-dashed pb-3 w-[full] overflow-hidden">
      <p className="font-sans font-semibold ">Select Address :</p>
      <Select
        required
        defaultValue={bookingAddress?.id}
        onValueChange={(value) =>
          setBookingAddress({
            id: value,
            name: items?.find((v) => v.value.toString() === value.toString())
              ?.label,
          })
        }
      >
        <SelectTrigger
          className={cn(
            " bg-white !border text-sm ring-offset-none focus-within:ring-0 focus-within:ring-offset-[0px] focus-within:ring-ring/30  focus-within:ring-offset-white border-primary/10 rounded-xl shadow-none h-fit p-0 whitespace-normal pr-2"
          )}
        >
          <AddressCard
            content={
              bookingAddress?.name
                ? items?.find(
                  (v) => v.value.toString() === bookingAddress?.id.toString()
                )?.label
                : "Select Address"
            }
            checked={true}
          />
        </SelectTrigger>
        <SelectContent className="border-none  rounded-2xl shadow-lg  bg-white p-0 z-[100000000000000] w-[90vw] lg:w-[400px] ">
          <SelectGroup className="w-full !p-0 !pr-2 m-0">
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="justify-start w-full [&>svg]:!text-green-500  !p-0 !pr-2"
              >
                <AddressCard content={item.label} className="pr-7" />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddressSelector;
