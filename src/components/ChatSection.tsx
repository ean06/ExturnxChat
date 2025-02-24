import { useEffect, useRef } from "react";
import { Chat } from "../type/chat";
import ChatBubble from "./ChatBubble";
import ScrollToBottom from "react-scroll-to-bottom";

type ChatSectionProps = {
    readonly chats: Chat[];
    readonly isStreaming?: boolean;
};

export default function ChatSection({ chats, isStreaming }: ChatSectionProps) {
    const scrollRef = useRef<ScrollToBottom>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollToBottom();
        }
    }, [chats]);

    return (
        <ScrollToBottom
            ref={scrollRef}
            initialScrollBehavior="smooth"
            className="grow overflow-auto mb-40"
            scrollViewClassName="flex flex-col gap-3 p-4"
        >
            {chats.map((chat) => (
                <ChatBubble key={chat.id} role={chat.role} isStreaming={isStreaming && chat.role === "assistant"}>
                    {chat.message}
                </ChatBubble>
            ))}
        </ScrollToBottom>
    );
}