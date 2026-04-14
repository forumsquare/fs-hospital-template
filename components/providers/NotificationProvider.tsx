"use client";

import { StatusCode } from "@/constants/api";
import { wsBaseUrl } from "@/constants/constant";
import { onTokenSet, qKey } from "@/lib/utils";
import useChatMessageStore from "@/stores/chatMessage";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { apiEndpoints } from "@/constants/api";

export const NotificationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { addMessage, chatRoomId, isChatOpen, setIsChatOpen } = useChatMessageStore();
    const chatRoomIdRef = useRef(chatRoomId);
    const isChatOpenRef = useRef(isChatOpen);
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        chatRoomIdRef.current = chatRoomId;
    }, [chatRoomId]);

    useEffect(() => {
        isChatOpenRef.current = isChatOpen;
    }, [isChatOpen]);

    const playNotificationSound = React.useCallback(() => {
        const audio = new Audio("/sounds/notification.mp3");
        audio.play().catch((error) => console.error("Error playing sound:", error));
    }, []);

    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const unsubscribe: () => void = onTokenSet((token: string) => {
            if (socketRef.current) return;
            // const { isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useChatMessageStore();

            console.log("Initializing Notification WebSocket...");

            const wsUrl = `${wsBaseUrl}/notifications/connect`;


            try {
                const wsWithToken = `${wsUrl}?token=${token}`;
                const socket = new WebSocket(wsWithToken);
                socketRef.current = socket;

                socket.onopen = () => {
                    console.log("Notification WebSocket connected");
                    setIsConnected(true);
                };

                socket.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log("Notification received:", data);

                        if (data.status === StatusCode.OK) {
                            return;
                        }

                        if (data.type === "appointment_booking") {
                            playNotificationSound();
                            toast("Appointment Booking", {
                                description: data.data.message || "A new appointment has been booked",
                                action: {
                                    label: "View",
                                    onClick: () => router.push(`/account/booking/${data.data.appointmentId}`),
                                },
                            });
                            return;
                        }

                        if (data.type === "new_message") {
                            if (!isChatOpenRef.current) {
                                playNotificationSound();
                                toast(`Message from ${data.data.senderName}`, {
                                    description: data.data.message,
                                    action: {
                                        label: "View",
                                        onClick: () => {
                                            setIsChatOpen(true);
                                        },
                                    },
                                });
                            }

                            if (data.data.chatId === chatRoomIdRef.current) {
                                addMessage({
                                    id: data.data.id || Date.now().toString(),
                                    content: data.data.message,
                                    senderId: data.data.senderId,
                                    createdAt: data.data.createdAt || new Date().toISOString(),
                                    status: data.data.status || "sent",
                                });
                            }
                            queryClient.invalidateQueries({
                                queryKey: qKey(apiEndpoints.chat.getUnreadCount),
                            });
                            return;
                        }

                        playNotificationSound();
                        toast(data.title || "New Notification", {
                            description: data.data.message || JSON.stringify(data),
                        });

                    } catch (e) {
                        console.log("Raw message received:", event.data);
                        toast("Notification", {
                            description: String(event.data),
                        });
                    }
                };

                socket.onerror = (error) => {
                    console.error("Notification WebSocket error:", error);
                    toast.error("Notification connection error");
                };

                socket.onclose = () => {
                    console.log("Notification WebSocket closed");
                    socketRef.current = null;
                    setIsConnected(false);
                };
            } catch (err) {
                console.error("Failed to create WebSocket:", err);
            }
        });

        cleanup = unsubscribe;

        return () => {
            if (cleanup) cleanup();
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [chatRoomId, addMessage, router, queryClient, playNotificationSound]);

    return <>{children}</>;
};
