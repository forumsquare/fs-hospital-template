import React, { useState } from "react";
import { SlidersHorizontal, Calendar, Star } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CustomDrawer from "@/components/custom/CustomDrawer";

interface ReviewsFilterProps {
  doctors: { doctor: string; id: string }[];
  selectedDoctor: string;
  sortBy: "DATE" | "RATING";
  sortOrder: "asc" | "desc";
  onDoctorChange: (doctor: string) => void;
  onSortChange: (sort: "DATE" | "RATING") => void;
  onOrderChange: (order: "asc" | "desc") => void;
}

const Filters = ({
  doctors,
  selectedDoctor,
  sortBy,
  sortOrder,
  onDoctorChange,
  onSortChange,
  onOrderChange,
}: ReviewsFilterProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className=" min-w-full sm:min-w-[250px]">
        <label className="block text-sm font-medium text-gray-600 mb-2  w-full">
          Select Doctor
        </label>
        <Select
          value={selectedDoctor}
          onValueChange={(value) => onDoctorChange(value)}
        >
          <SelectTrigger className="w-full space-x-2 outline-none">
            <SelectValue placeholder="Select Doctor" />
          </SelectTrigger>
          <SelectContent className="z-[200000000000]">
            <SelectGroup>
              <SelectItem value="All">All Doctors</SelectItem>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  Dr. {doctor.doctor}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[100px]">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Sort By
        </label>
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as "DATE" | "RATING")}
        >
          <SelectTrigger className="w-full space-x-2 outline-none flex">
            <SelectValue placeholder="Select Sort Type" />
          </SelectTrigger>
          <SelectContent className="z-[200000000000]">
            <SelectGroup>
              <SelectItem
                value="DATE"
                className="!flex border items-center gap-2"
              >
                <div className="flex gap-2 items-center">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
              </SelectItem>
              <SelectItem value="RATING" className="flex items-center gap-2">
                <div className="flex gap-2 items-center">
                  <Star className="w-4 h-4" />
                  Rating
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[100px]">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Order
        </label>

        <Select
          value={sortOrder}
          onValueChange={(value) => onOrderChange(value as "asc" | "desc")}
        >
          <SelectTrigger className="w-full space-x-2 outline-none">
            <SelectValue placeholder="Select Order" />
          </SelectTrigger>
          <SelectContent className=" z-[2000000000]">
            <SelectItem value="desc">Highest First</SelectItem>
            <SelectItem value="asc">Lowest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const ReviewsFilter: React.FC<ReviewsFilterProps> = ({
  doctors,
  selectedDoctor,
  sortBy,
  sortOrder,
  onDoctorChange,
  onSortChange,
  onOrderChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <CustomDrawer
        open={isOpen}
        setOpen={setIsOpen}
        title="Filter Reviews"
        trigger={<SlidersHorizontal className="w-5 h-5 text-green-600" />}
        triggerOptions={{ className: "pl-4 pb-4 " }}
        className="px-4"
      >
        <Filters
          doctors={doctors}
          selectedDoctor={selectedDoctor}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onDoctorChange={onDoctorChange}
          onSortChange={onSortChange}
          onOrderChange={onOrderChange}
        />
      </CustomDrawer>
    );
  }
  return (
    <div className="bg-white p-6 rounded-xl border mb-8">
      <div className="flex items-center gap-1 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-green-600" />
        <h2 className="font-semibold text-gray-800">Filter Reviews</h2>
      </div>

      <Filters
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onDoctorChange={onDoctorChange}
        onSortChange={onSortChange}
        onOrderChange={onOrderChange}
      />
    </div>
  );
};
