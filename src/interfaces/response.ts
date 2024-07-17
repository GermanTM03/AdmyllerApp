export type ResponseType<T> = {
    isSuccess: boolean
    data?: T
    message?: string
}