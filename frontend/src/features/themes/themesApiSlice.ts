import type { FetchArgs } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseAuthQuery } from '@/features/auth/baseAuthQuery.ts';
import type { ThemesResponse } from '@/features/themes/interfaces/themes-response.interface.ts';
import { themesResponseSchema } from '@/features/themes/interfaces/themes-response.interface.ts';
import {
  createIdTag,
  createListTag,
  provided,
  providedList,
  providedTree,
} from '@/app/rtk-tags.ts';
import type { Theme } from '@/features/themes/interfaces/theme.interface.ts';
import { themeSchema } from '@/features/themes/interfaces/theme.interface.ts';
import type { CreateTheme } from '@/features/themes/interfaces/create-theme.interface.ts';
import { createThemeSchema } from '@/features/themes/interfaces/create-theme.interface.ts';
import type { UpdateTheme } from '@/features/themes/interfaces/update-theme.interface.ts';
import type { TreeThemes } from '@/features/themes/interfaces/tree-themes.interface.ts';
import { treeThemesSchema } from '@/features/themes/interfaces/tree-themes.interface.ts';

export const themesApiSlice = createApi({
  reducerPath: 'themesApi',
  baseQuery: baseAuthQuery,
  tagTypes: ['Themes'],
  endpoints: build => ({
    createTheme: build.mutation<Theme, CreateTheme>({
      query: (body): FetchArgs => ({
        url: '/themes/',
        method: 'POST',
        body,
      }),
      responseSchema: themeSchema,
      argSchema: createThemeSchema,
      invalidatesTags: [createListTag('Themes')],
    }),

    getThemesList: build.query<ThemesResponse, void>({
      query: () => `/themes/`,
      responseSchema: themesResponseSchema,
      providesTags: result => providedList(result?.data, 'Themes'),
    }),
    getThemesTree: build.query<TreeThemes, void>({
      query: () => `/themes/?tree=true`,
      responseSchema: treeThemesSchema,
      providesTags: result => providedTree(result?.data, 'Themes'),
    }),
    getTheme: build.query<Theme, number>({
      query: id => `/themes/${String(id)}/`,
      responseSchema: themeSchema,
      providesTags: (_, __, arg) => provided(arg, 'Themes'),
    }),
    updateTheme: build.mutation<Theme, UpdateTheme>({
      query: (arg): FetchArgs => ({
        url: `/themes/${String(arg.id)}/`,
        method: 'PATCH',
        body: arg.body,
      }),
      responseSchema: themeSchema,
      invalidatesTags: (_, __, arg) => [createIdTag(arg.id, 'Themes')],
    }),
    deleteTheme: build.mutation<Theme, number>({
      query: (id): FetchArgs => ({
        url: `/themes/${String(id)}/`,
        method: 'DELETE',
      }),
      responseSchema: themeSchema,
      invalidatesTags: (_, __, arg) => [
        createIdTag(arg, 'Themes'),
        createListTag('Themes'),
      ],
    }),
  }),
});

export const {
  useCreateThemeMutation,
  useGetThemesListQuery,
  useGetThemesTreeQuery,
  useGetThemeQuery,
  useUpdateThemeMutation,
  useDeleteThemeMutation,
} = themesApiSlice;
