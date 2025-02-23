import { Chat } from "../type//chat";
import ChatBubble from "./ChatBubble";
import ScrollToBottom from "react-scroll-to-bottom"


type ChatSectionProps = {
    readonly chats: Chat[];
};

export default function ChatSection({ chats }: ChatSectionProps) {
    return (
        <ScrollToBottom
            initialScrollBehavior="smooth"
            className="grow overflow-auto mb-40"
            scrollViewClassName="flex flex-col gap-3 p-4"
        >
        {chats.map((chat) => (
            <ChatBubble key={chat.id} role={chat.role}>
                {chat.message}
            </ChatBubble>
        ))}
        </ScrollToBottom>
    );
}