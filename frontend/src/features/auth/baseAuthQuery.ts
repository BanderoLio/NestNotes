import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '@/app/constants.ts';
import type { RootState } from '@/app/store.ts';
import { removeAuthentication } from '@/features/auth/authSlice.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const authentication = (getState() as RootState).auth.authentication;
    if (authentication)
      headers.set('Authorization', `Bearer ${authentication.accessToken}`);
    return headers;
  },
});

export const baseAuthQuery: BaseQueryFn = async (
  args: string | FetchArgs,
  api,
  extraOptions,
) => {
  const res = await baseQuery(args, api, extraOptions);
  if (res.error && res.error.status === 401) {
    api.dispatch(removeAuthentication());
  }
  return res;
};
