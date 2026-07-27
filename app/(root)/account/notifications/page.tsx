"use client";

import { CustomHeader } from "@/components/custom/CustomHeader";
import { NotificationCard } from "./components/NotificationCard";
import { formatDate, formatTime, toLocalISOString } from "@/lib/utils";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetNotificationsQuery } from "@/services/query/notificationsQuery";
import CustomLoading from "@/components/custom/CustomLoading";
import { format } from "date-fns";
import NoDataPage from "@/components/custom/NoDataPage";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function NotificationsPage() {
  const { isAuthed } = useRequireAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const { data, isPending } = useGetNotificationsQuery({
    page,
    limit,
  });

  const loadMore = () => {
    if (!isPending && hasMore) {
      setPage((prev) => prev + 1);
      if (data && data.length < limit) {
        setHasMore(false);
      }
    }
  };

  // Group notifications by date and sort them

  const groupedNotifications = data
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .reduce((acc, notification) => {
      const date = new Date(
        new Date(notification.createdAt).setHours(0, 0, 0, 0)
      ).toISOString();

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {} as Record<string, typeof data>);

  console.log(groupedNotifications);

  useEffect(() => {
    if (!data) return;
    if (data.length < limit) {
      setHasMore(false);
    }
  }, [data, limit]);

  if (!isAuthed || isPending) return <CustomLoading />;

  return (
    <section className="flex flex-col gap-y-5 mx-3 sm:mx-auto !max-w-screen-sm my-10 min-h-screen ">
      <CustomHeader title="Notifications" className="!w-full" />
      {!data || !groupedNotifications || data.length === 0 ? (
        <NoDataPage
          title="No Notifications Yet 
You're all caught up!
 We'll notify you when there's something new."
        />
      ) : (
        <div className="flex flex-col gap-y-5  ">
          {Object.entries(groupedNotifications)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([date, notifications]) => (
              <div
                key={date}
                className="flex flex-col gap-y-3 bg-white border rounded-2xl p-4"
              >
                <h3 className="font-bold text-gray-600">
                  {formatDate(new Date(date)) === formatDate(new Date())
                    ? "Today"
                    : formatDate(new Date(date)) ===
                      formatDate(
                        new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
                      )
                      ? "Yesterday"
                      : formatDate(new Date(date))}
                </h3>
                {notifications.map((notification, index) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    isLast={index === notifications.length - 1}
                  />
                ))}
              </div>
            ))}
          <InfiniteScroll
            hasMore={true}
            isLoading={false}
            next={() => { }}
            threshold={1}
          >
            <div
              ref={(ref) => {
                if (ref) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting && hasMore && !isPending) {
                        loadMore();
                      }
                    },
                    { threshold: 0.1 }
                  );
                  observer.observe(ref);
                  return () => observer.disconnect();
                }
              }}
            >
              {hasMore && (
                <Loader2 className="my-4 h-8 w-8 animate-spin mx-auto" />
              )}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </section>
  );
}
