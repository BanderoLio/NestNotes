export interface Jwt {
  access_token: string;
  refresh_token?: string;
}

export interface JwtPayload {
  sub: number;
  type: 'Access' | 'Refresh';
}
