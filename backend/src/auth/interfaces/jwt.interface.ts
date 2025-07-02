export interface Jwt {
  accessToken: string;
  refreshToken?: string;
}

export interface JwtPayload {
  sub: number;
  type: 'Access' | 'Refresh';
}
