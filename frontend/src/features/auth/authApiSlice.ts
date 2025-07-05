import type { FetchArgs } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '@/app/constants.ts';
import type { Authentication } from '@/features/auth/interfaces/authentication.interface.ts';
import { authenticationSchema } from '@/features/auth/interfaces/authentication.interface.ts';
import type { UserLogin } from '@/features/auth/interfaces/userlogin.interface.ts';
import { userLoginSchema } from '@/features/auth/interfaces/userlogin.interface.ts';
import type { UserRegister } from '@/features/auth/interfaces/userregister.interface.ts';
import { userRegisterSchema } from '@/features/auth/interfaces/userregister.interface.ts';

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  reducerPath: 'authApi',
  endpoints: build => ({
    login: build.mutation<Authentication, UserLogin>({
      query: (body): FetchArgs => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
      responseSchema: authenticationSchema,
      argSchema: userLoginSchema,
    }),
    register: build.mutation<Authentication, UserRegister>({
      query: (body): FetchArgs => ({
        url: '/auth/register/',
        method: 'POST',
        body,
      }),
      responseSchema: authenticationSchema,
      argSchema: userRegisterSchema,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
