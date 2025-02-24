import React from "react";

type PromptForm = {
    readonly onSubmit: (prompt: string) => void;
    readonly disabled: boolean;
};

export default function PromptForm({ onSubmit, disabled }: PromptForm) {
    const promptRef = React.useRef<HTMLTextAreaElement>(null);
    const [prompt, setPrompt] = React.useState("");
    const isPromptEmpty = prompt.trim() === "";
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        if (disabled || isPromptEmpty) return;
        
        onSubmit(prompt);
        setPrompt("");
        promptRef.current?.focus();
    };
    React.useEffect(() => {
        promptRef.current?.focus();
        
    },[]);
    
    React.useEffect(() => {
        const textarea = promptRef.current;

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
        };

        if (textarea) {
            textarea.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('keyup', handleKeyUp);
            }
        };
    }, [prompt, disabled, onSubmit]);

    return (
        <div className="fixed bottom-0 md:left-50 md:right-50 xl:left-100 xl:right-100 rounded-lg flex justify-center bg-[#f2f0fc] p-4">
            <form
                id="chatBox"
                className="flex gap-4 w-full max-w-4xl flex-none items-start"
                onSubmit={handleSubmit}
            >
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    ref={promptRef}
                    name="prompt"
                    id="prompt"
                    placeholder="Ask Anything..."
                    className="w-full h-24 border resize-none transition focus:outline-none border-slate-700 focus:border-slate-500 focus:ring focus:ring-slate-500 rounded-lg px-3 py-2" // resize-none menonaktifkan resize
                    rows={4}
                />
                <button
                    disabled={disabled || isPromptEmpty}
                    type="submit"
                    className="bg-slate-700 px-4 disabled:opacity-50 my-auto py-2 rounded-lg focus:ring focus:ring-slate-500 transition focus:outline-none"
                >
                SEND
                </button>
            </form>
        </div>
    );
}