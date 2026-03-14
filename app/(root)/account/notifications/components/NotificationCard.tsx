"use client";

import { cn, formatTime } from "@/lib/utils";
import { NotificationType } from "@/models/schema";
import { useMarkAsReadQuery } from "@/services/query/notificationsQuery";
import { Icon } from "@radix-ui/react-select";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const NotificationCard = ({
  notification,
  isLast,
}: {
  notification: NotificationType;
  isLast: boolean;
}) => {
  // console.log(notification);
  const router = useRouter();
  const { mutateAsync: markAsRead } = useMarkAsReadQuery();

  const handleClick = () => {
    markAsRead(notification.id);
    router.push(`/account/booking/${notification.data.id}`);
  };
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2 cursor-pointer",
        !isLast && "border-b-2",
        notification.isRead && "opacity-50"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <div className="sm:w-[60px] sm:h-[60px] w-[50px] h-[40px] flex justify-center items-center bg-gray-100 rounded-full">
          <Image src="/icons/notification.svg" width={20} height={20} alt="" />
        </div>
        <div>
          <div className="text-base font-bold">{notification.title}</div>
          <div className="text-xs text-[var(--main-gray)] ">
            {notification.content}
          </div>
        </div>
      </div>
      <div className="text-[10px] whitespace-nowrap ml-1">
        {formatTime(new Date(notification.createdAt))}
      </div>
    </div>
  );
};
