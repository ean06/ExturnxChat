export type Chat = {
    readonly id: string,
    readonly message: string,
    readonly role: "user" | "assistant"
}