import React from "react";
import {
  ChatMessage,
  type ChatMessageProps,
  type Message,
} from "@/components/ui/chat-message";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const formatDateHeader = (date: Date) => {
  const d = dayjs(date);
  if (d.isToday()) return "Today";
  if (d.isYesterday()) return "Yesterday";
  return d.format("MMMM D, YYYY");
};

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

interface MessageListProps {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  messageOptions?:
    | AdditionalMessageOptions
    | ((message: Message) => AdditionalMessageOptions);
}

export function MessageList({
  messages,
  showTimeStamps = true,
  isTyping = false,
  messageOptions,
}: MessageListProps) {
  return (
    <div className="space-y-4 overflow-visible ">
      {messages.map((message, index) => {
        const additionalOptions =
          typeof messageOptions === "function"
            ? messageOptions(message)
            : messageOptions;

        const prevMessage = index > 0 ? messages[index - 1] : null;
        const showDateHeader =
          !prevMessage ||
          !dayjs(message.createdAt).isSame(dayjs(prevMessage.createdAt), "day");

        return (
          <React.Fragment key={message.id || index}>
            {showDateHeader && message.createdAt && (
              <div className="flex justify-center my-6 sticky top-0 z-10">
                <span className="bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                  {formatDateHeader(message.createdAt)}
                </span>
              </div>
            )}
            <ChatMessage
              showTimeStamp={showTimeStamps}
              createdAt={message.createdAt}
              {...message}
              {...additionalOptions}
            />
          </React.Fragment>
        );
      })}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
