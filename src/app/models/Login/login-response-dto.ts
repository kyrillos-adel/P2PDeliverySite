export interface LoginResponseDTO {
    token: string;
    expiration: Date;
    refreshToken: string;
    refreshTokenExpiration: Date;
    userName: string;
    email: string;
    role: string[];
  }