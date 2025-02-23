import React from "react";

type PromptForm = {
    readonly onSubmit: (prompt: string) => void;
    readonly disabled: boolean;
};

export default function PromptForm({ onSubmit, disabled }: PromptForm) {
    const promptRef = React.useRef<HTMLTextAreaElement>(null);
    const [prompt, setPrompt] = React.useState("");
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        if (disabled) return;
        
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
        <>
            <form
                id="chatBox"
                className="flex gap-4 p-4 flex-none items-start"
                onSubmit={handleSubmit}
            >
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    ref={promptRef}
                    name="prompt"
                    id="prompt"
                    placeholder="Enter your prompt..."
                    className="w-full border transition focus:outline-none border-slate-700 ring focus:border-slate-500 focus:border focus:ring focus:ring-slate-500 ring-slate-700 rounded-lg px-3 py-2"
                    rows={4}
                />
                <button
                    disabled={disabled}
                    type="submit"
                    className="bg-slate-700 px-3 disabled:opacity-50 py-2 rounded-lg focus:ring focus:ring-slate-500 transition focus:outline-none"
                >
                    SEND
                </button>
            </form>
        </>
    );
}