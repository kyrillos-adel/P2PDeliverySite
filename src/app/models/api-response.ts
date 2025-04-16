export interface ApiResponse<T> {
    data: T;
    errorCode: number;
    isSuccess: boolean;
    message: string;
}
