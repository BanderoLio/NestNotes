import { createAppSlice } from '@/app/createAppSlice.ts';
import type { Authentication } from '@/features/auth/interfaces/authentication.interface.ts';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AuthSliceState = {
  authentication?: Authentication;
};

const initialState: AuthSliceState = {};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: initialState,
  reducers: create => ({
    setAuthentication: create.reducer(
      (state, action: PayloadAction<Authentication>) => {
        state.authentication = action.payload;
      },
    ),
    removeAuthentication: create.reducer(state => {
      state.authentication = undefined;
    }),
  }),
  selectors: {
    selectAuthentication: sliceState => sliceState.authentication,
  },
});

export const { setAuthentication, removeAuthentication } = authSlice.actions;
export const { selectAuthentication } = authSlice.selectors;
