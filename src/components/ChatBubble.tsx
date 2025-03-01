import clsx from "clsx";
import React from "react";
import Markdown from "react-markdown";

type ChatBubbleProps = {
    readonly children: React.ReactNode;
    readonly role: "user" | "assistant";
    readonly isStreaming?: boolean;
};

export default function ChatBubble({ children, role, isStreaming }: ChatBubbleProps) {

    const renderContent = (text: string) => {
        const parts = text.split(/(<think>.*?<\/think>)/gi);

        return parts.map((part, index) => {
            if (part.startsWith("<think>") && part.endsWith("</think>")) {
                const innerText = part.replace(/<\/?think>/g, "");
                return (
                    <div
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md border border-yellow-300 my-1"
                    >
                        🤔 {innerText}
                    </div>
                );
            }
            return <Markdown key={index}>{part}</Markdown>;
        });
    };

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
            {renderContent(children?.toString() || "")}

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