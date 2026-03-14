import { create } from "zustand";

export type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  status: "sent" | "delivered" | "read";
};
type State = {
  chatRoomId: string | undefined;
  messages: ChatMessage[];
  isChatOpen: boolean;
};

type Actions = {
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setChatRoomId: (chatRoomId: string) => void;
  setIsChatOpen: (isOpen: boolean) => void;
};

const initialstate = {
  chatRoomId: undefined,
  messages: [],
  isChatOpen: false,
};

const useChatMessageStore = create<State & Actions>()((set) => ({
  ...initialstate,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setChatRoomId: (chatRoomId) => set({ chatRoomId }),
  setIsChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
}));

export default useChatMessageStore;
