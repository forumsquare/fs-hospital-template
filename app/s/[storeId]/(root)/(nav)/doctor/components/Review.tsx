import { formatDate } from "@/lib/utils";
import { ReviewType } from "@/models/schema";
import Image from "next/image";
import React, { FC } from "react";

const ReviewCard: FC<ReviewType> = ({ id, date, review, name }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-4 shadow-md shadow-slate-600/30 flex flex-col gap-y-2.5 ">
      <div className="flex items-center">
        <div className="p-1.5 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 ">
          <Image
            src="/icons/account.svg"
            alt="account"
            width={16}
            height={16}
          />
        </div>
        <p className="flex-1 font-bold mx-3 text-sm tracking-wide  bg-gradient-to-tr from-gray-100 to-gray-300 bg-clip-text text-transparent ">
          {name}
        </p>
        <span className=" text-[10px] sm:text-xs text-zinc-300 font-medium">
          {formatDate(new Date(date))}
        </span>
      </div>
      <span className="mx-3  text-xs  font-sans italic text-blue-100/90 tracking-wider leading-[18px] ">
        {review}
      </span>
      {id == "2" && (
        <div className="mt-2 mr-2 ml-auto rounded-xl px-3 py-1  text-xs bg-orange-100 text-orange-500 italic font-sans leading-[18px] font-semibold max-w-[70%]">
          <p>Thank you for the review</p>
          <p className="text-[8px] text-end">- {name}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
