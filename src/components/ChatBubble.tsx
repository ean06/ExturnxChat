import clsx from "clsx";
import React from "react";
import Markdown from "react-markdown";

type ChatBubbleProps = {
    readonly children: React.ReactNode;
    readonly role: "user" | "assistant";
    readonly isStreaming?: boolean;
};

export default function ChatBubble({ children, role, isStreaming }: ChatBubbleProps) {
    return (
        <div
            className={clsx(
                role === "user"
                ? "bg-blue-500 text-white rounded-br-none self-end" 
                : "bg-gray-100 text-gray-800 rounded-bl-none self-start",
                "rounded-xl px-4 py-2 max-w-[70%] break-words shadow-md relative overflow-hidden",
                isStreaming && role === "assistant" && "pr-8"
            )}
        >
            {/* Render pesan dengan Markdown */}
            <Markdown>{children?.toString()}</Markdown>

            {/* Animasi untuk streaming response */}
            {isStreaming && role === "assistant" && (
                <div className="absolute bottom-2 right-2 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
            )}
        </div>
    );
}