import type { NotesFilters } from '@/features/notes/interfaces/notes-filters.interface.ts';
import { createAppSlice } from '@/app/createAppSlice.ts';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NotesSliceState = {
  filters: NotesFilters;
};

const initialState: NotesSliceState = {
  filters: {},
};

export const notesSlice = createAppSlice({
  name: 'notes',
  initialState,
  reducers: create => ({
    updateFilters: create.reducer(
      (state, action: PayloadAction<Partial<NotesFilters>>) => {
        state.filters = {
          ...state.filters,
          ...action.payload,
        };
      },
    ),
    resetFilters: create.reducer(state => {
      state.filters = {};
    }),
  }),
  selectors: {
    selectFilters: sliceState => sliceState.filters,
  },
});

export const { selectFilters } = notesSlice.selectors;
export const { updateFilters, resetFilters } = notesSlice.actions;
