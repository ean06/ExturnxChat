import clsx from "clsx";
import React from "react";
import Markdown from "react-markdown";


type ChatBubbleProps = {
    readonly children: React.ReactNode;
    readonly role: "user" | "assistant";
};

export default function ChatBubble({ children, role }: ChatBubbleProps ){
    return(
        <div
            className={clsx(
                role == "user"
                ? "color-chatUser rounded-bl-lg self-end"
                : "color-chatAssistant rounded-br-lg self-start",
                "rounded-tl-lg max-w-lg inline-block rounded-tr-lg px-3 py-2"
            )}
        >
            <Markdown>
                {children?.toString()}
            </Markdown>
        </div>
    )

}