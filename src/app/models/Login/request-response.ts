export interface RequestResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
    errorCode?: string;
  }