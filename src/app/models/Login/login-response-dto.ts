export interface LoginResponseDTO {
    token: string;
    expiration: Date;
    userName: string;
    email: string;
    role: string[];
  }