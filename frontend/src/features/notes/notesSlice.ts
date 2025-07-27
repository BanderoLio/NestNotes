import type { NotesFilters } from '@/features/notes/interfaces/notes-filters.interface.ts';
import { createAppSlice } from '@/app/createAppSlice.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TreeTheme } from '@/features/themes/interfaces/tree-theme.interface.ts';
import type { NotesFiltersSettings } from '@/features/notes/interfaces/notes-filters-settings.ts';
import type { OptionalProperty } from '@/app/utils/types.ts';

export type NotesSliceState = {
  filters: NotesFilters;
  filtersSettings: NotesFiltersSettings;
};

const initialState: NotesSliceState = {
  filters: {},
  filtersSettings: {
    themeIdsWithChildren: false,
  },
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
    updateFiltersSettings: create.reducer(
      (state, action: PayloadAction<Partial<NotesFiltersSettings>>) => {
        state.filtersSettings = {
          ...state.filtersSettings,
          ...action.payload,
        };
      },
    ),
    setThemeIdsByTreeTheme: create.reducer(
      (
        state,
        action: PayloadAction<OptionalProperty<TreeTheme, 'children'>>,
      ) => {
        const theme = action.payload;
        console.log('theme', theme);
        const themeIds: number[] = [];
        const getThemeIds = (
          theme: typeof action.payload,
          recursive = true,
        ) => {
          themeIds.push(theme.id);
          if (recursive && theme.children) {
            theme.children.forEach(value => {
              getThemeIds(value);
            });
          }
        };
        getThemeIds(theme, state.filtersSettings.themeIdsWithChildren);
        state.filters = {
          ...state.filters,
          themeIds,
        };
      },
    ),
  }),
  selectors: {
    selectFilters: sliceState => sliceState.filters,
    selectFiltersSettings: sliceState => sliceState.filtersSettings,
  },
});

export const { selectFilters } = notesSlice.selectors;
export const {
  updateFilters,
  resetFilters,
  updateFiltersSettings,
  setThemeIdsByTreeTheme,
} = notesSlice.actions;
