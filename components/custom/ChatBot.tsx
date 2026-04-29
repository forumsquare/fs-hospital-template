"use client";

import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { Button } from "@/components/ui/button";
import { ChatForm, ChatContainer, ChatMessages } from "../ui/chat";
import { MessageInput } from "../ui/message-input";
import { MessageList } from "../ui/message-list";
import useChatMessageStore from "@/stores/chatMessage";
import { Message } from "../ui/chat-message";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  useGetMessagesQuery,
  useGetUnreadCountQuery,
  useSendMessageMutation,
  useUpdateSeenMutation,
} from "@/services/query/chatQuery";
import { StatusCode } from "@/constants/api";
import { storeId } from "@/constants/constant";
import { getCookie } from "@/lib/serverCom";
import { auth } from "@/lib/firebase";
import AskForLogin from "./AskForLogin";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

const Comp = ({
  setIsOpen,
  chatRef,
}: {
  setIsOpen: (value: boolean) => void;
  chatRef: React.RefObject<HTMLDivElement>;
}) => {
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState("");

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const { messages, setMessages, setChatRoomId, chatRoomId } =
    useChatMessageStore();

  const { data: chatData, isLoading: isLoadingMessages } = useGetMessagesQuery({
    page: 1,
    limit: 20,
  });

  const { mutate: sendMessageMutate } = useSendMessageMutation();
  const { mutate: updateSeenMutate } = useUpdateSeenMutation();

  console.log({ messages })

  useEffect(() => {
    if (chatRoomId && userId) {
      const filteredMessages = messages.filter((msg) => msg.senderId !== userId);
      const lastSeenMsgId = filteredMessages.length > 0
        ? filteredMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].id
        : "";

      console.log({ lastSeenMsgId }, messages, userId);
      updateSeenMutate({
        chatId: chatRoomId,
        lastSeenMsgId,
      });
    }
  }, [chatRoomId, messages, updateSeenMutate, userId]);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      const res = await getCookie("userInfo");
      if (res) {
        const user = JSON.parse(res);
        setUserId(user.id);
        setLoading(false);
      }
    };
    fetchUser();
    setLoading(false)
  }, []);


  useEffect(() => {
    if (userId) {
      setChatMessages(
        messages.map((message) => ({
          id: message.id,
          role: message.senderId === userId ? "user" : "assistant",
          content: message.content,
          createdAt: message.id
            ? new Date(Number(message.id.substring(0, 13)))
            : new Date(),
        }))
      );
    }
    setIsEmpty(messages.length === 0);
  }, [messages, userId]);

  useEffect(() => {
    if (chatData) {
      const mapped = chatData.map((message: any, index: number) => {
        const generatedId = message.id || (Date.now() - (chatData.length - index) * 60000).toString();

        return {
          id: generatedId,
          content: message.message,
          senderId: message.senderId,
          createdAt: message.createdAt || new Date(Number(generatedId)).toISOString(),
          status: message.status || "sent",
        };
      });
      setMessages(mapped);
    }
  }, [chatData, setMessages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (userId) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userId, chatRef, setIsOpen]);

  const isMobile = useMediaQuery("(max-width: 900px)");

  console.log({ userId, loading })
  return (
    <div
      className={cn([
        `fixed right-0 top-0 pt-20 md:pt-0 md:right-4 md:top-[50%] md:translate-y-[-50%] transition-all duration-500 w-screen h-full md:w-[400px] md:h-[calc(100vh-150px)] 
          bg-card md:rounded-2xl  z-[20000000] animate-in fade-in slide-in-from-right-1/2  !overflow-hidden chat-shadow `,
        !userId && !isMobile && "!z-[1]",
      ])}
    >
      {!userId && !loading && <AskForLogin onCancel={() => setIsOpen(false)} />}
      <div className="absolute top-0 left-0 w-full h-16 bg-green-600 p-4  flex justify-between items-center z-[1000000]">
        <div>
          <h3 className="text-white font-semibold">Chat with us</h3>
          <p className="text-indigo-100 text-sm">
            We typically reply within minutes
          </p>
        </div>
      </div>
      <Button
        className="absolute top-4 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full right-4 md:hidden z-[1000000] "
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      {isLoadingMessages && (
        <div className="flex items-center justify-center h-full">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}
      {isEmpty && !isLoadingMessages ? (
        <div className="flex flex-col gap-4 items-center justify-center h-full">
          <Image
            src="/icons/sadFace.svg"
            alt="sad face"
            width={50}
            height={50}
          />
          <div className="text-sm text-primary/50 font-bold">
            You don&apos;t have any messages yet
          </div>
        </div>
      ) : null}
      <ChatContainer className="absolute w-full bottom-0 p-4  ">
        {!isEmpty ? (
          <ChatMessages messages={chatMessages}>
            <MessageList
              messages={chatMessages}
              isTyping={false}
              messageOptions={(message) => ({
                className: "", // Now using themed defaults in ChatMessage
              })}
            />
          </ChatMessages>
        ) : null}

        <ChatForm
          className="mt-auto"
          isPending={false}
          handleSubmit={(
            event?: { preventDefault?: () => void },
            options?: { experimental_attachments?: FileList }
          ) => {
            // event?.preventDefault();
            console.log(input, { chatRoomId });
            if (input.trim() !== "") {
              const tempMessage = {
                id: Date.now().toString(),
                content: input,
                senderId: userId,
                createdAt: new Date().toISOString(),
                status: "sent" as const,
              };

              setMessages([...messages, tempMessage]);

              console.log({ chatRoomId, input, storeId });
              sendMessageMutate({
                chatId: chatRoomId || null,
                message: input,
                storeId: storeId,
              });

              setInput("");
            }
            setIsTyping(false);
          }}
        >
          {({ files = [], setFiles = () => { } }) => (
            <MessageInput
              placeholder="Ask a question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              allowAttachments
              files={files}
              setFiles={setFiles}
              stop={() => { }}
              isGenerating={false}
            />
          )}
        </ChatForm>
      </ChatContainer>
    </div>
  );
};
export default function ChatBot() {
  // const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useChatMessageStore();
  const chatRef = useRef<HTMLDivElement>(null);
  const { setChatRoomId, chatRoomId } = useChatMessageStore();

  const { data: unreadData } = useGetUnreadCountQuery();

  console.log({ unreadData });
  useEffect(() => {
    if (unreadData?.chatId) {
      setChatRoomId(unreadData.chatId);
    }
  }, [unreadData, setChatRoomId]);

  console.log({ pathname });

  return (
    <div ref={chatRef}>
      <div className={cn("fixed bottom-4 right-4 z-[1000]", pathname.includes("doctor") && "!bottom-20 lg:!bottom-4")}>
        <Button
          className={cn(
            "hover:scale-[1.1] transition-all duration-200 active:!scale-[0.9] !z-[1000] p-0 rounded-full h-12 w-12 !bg-card relative",
            isOpen && "!bg-white !z-[2000000000000000]  ring-2"
          )}
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
        >
          {!isOpen && unreadData?.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm border border-white">
              {unreadData.unreadCount > 99 ? "99+" : unreadData.unreadCount}
            </span>
          )}
          {isOpen ? (
            <ChevronDown className="h-4 w-4 animate-spin-once" />
          ) : (
            <Image
              className="animate-pulse !transition-all duration-600"
              src="/icons/chat.svg"
              alt="chatbot"
              width={24}
              height={24}
            />
          )}
        </Button>
      </div>

      {isOpen && <Comp setIsOpen={setIsOpen} chatRef={chatRef} />}
    </div>
  );
}
