import type { FetchArgs } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseAuthQuery } from '@/features/auth/baseAuthQuery.ts';
import type { NotesResponse } from '@/features/notes/interfaces/notes-response.interface.ts';
import { notesResponseSchema } from '@/features/notes/interfaces/notes-response.interface.ts';
import type { PaginationQuery } from '@/app/interfaces/pagination-query.interface.ts';
import type { Note } from '@/features/notes/interfaces/note.interface.ts';
import { noteSchema } from '@/features/notes/interfaces/note.interface.ts';
import type { UpdateNote } from '@/features/notes/interfaces/update-note.interface.ts';
import { updateNoteSchema } from '@/features/notes/interfaces/update-note.interface.ts';
import type { CreateNote } from '@/features/notes/interfaces/create-note.interface.ts';
import { createNoteSchema } from '@/features/notes/interfaces/create-note.interface.ts';
import {
  createIdTag,
  createListTag,
  provided,
  providedList,
} from '@/app/rtk-tags.ts';
import type {
  NotesQuery,
  PaginatedNotesQuery,
} from '@/features/notes/interfaces/notes-query.interface.ts';
import { paginatedNotesQuerySchema } from '@/features/notes/interfaces/notes-query.interface.ts';
import { makeStringRecord } from '@/app/utils/make-string-record.ts';

export const notesApiSlice = createApi({
  reducerPath: 'notesApi',
  baseQuery: baseAuthQuery,
  tagTypes: ['Notes'],
  endpoints: build => ({
    createNote: build.mutation<Note, CreateNote>({
      query: (body): FetchArgs => ({
        url: '/notes/',
        method: 'POST',
        body,
      }),
      responseSchema: noteSchema,
      argSchema: createNoteSchema,
      invalidatesTags: [createListTag('Notes')],
    }),
    getNotes: build.query<NotesResponse, PaginatedNotesQuery>({
      query: ({ pagination: { limit, skip }, filters }) =>
        `/notes/?limit=${String(limit)}&skip=${String(skip)}&${new URLSearchParams(makeStringRecord(filters)).toString()}`,
      responseSchema: notesResponseSchema,
      argSchema: paginatedNotesQuerySchema,
      providesTags: result => providedList(result?.data, 'Notes'),
    }),
    getNotesPages: build.infiniteQuery<
      NotesResponse,
      NotesQuery,
      PaginationQuery
    >({
      query: ({ queryArg: { filters }, pageParam }) =>
        `/notes/?limit=${String(pageParam.limit)}&skip=${String(pageParam.skip)}&${new URLSearchParams(makeStringRecord(filters))}`,
      providesTags: result =>
        result?.pages.map(page => providedList(page.data, 'Notes')).flat() ??
        [],
      infiniteQueryOptions: {
        initialPageParam: { limit: 20, skip: 0 },
        getNextPageParam: (
          lastPage,
          __,
          { limit, skip },
        ): PaginationQuery | undefined =>
          skip + limit < lastPage.meta.total
            ? {
                limit,
                skip: skip + limit,
              }
            : undefined,
        getPreviousPageParam: (
          _,
          __,
          { limit, skip },
        ): PaginationQuery | undefined =>
          skip - limit >= 0
            ? {
                limit,
                skip: skip - limit,
              }
            : undefined,
      },
      responseSchema: notesResponseSchema,
    }),
    getNote: build.query<Note, number>({
      query: id => `/notes/${String(id)}/`,
      responseSchema: noteSchema,
      providesTags: (_, __, id) => provided(id, 'Notes'),
    }),
    updateNote: build.mutation<Note, UpdateNote>({
      query: (arg): FetchArgs => ({
        url: `/notes/${String(arg.id)}/`,
        method: 'PATCH',
        body: arg.body,
      }),
      responseSchema: noteSchema,
      argSchema: updateNoteSchema,
      invalidatesTags: (_, __, arg) => [
        createIdTag(arg.id, 'Notes'),
        createListTag('Notes'),
      ],
    }),
    deleteNote: build.mutation<Note, number>({
      query: (id): FetchArgs => ({
        url: `/notes/${String(id)}/`,
        method: 'DELETE',
      }),
      responseSchema: noteSchema,
      invalidatesTags: (_, __, id) => [
        createIdTag(id, 'Notes'),
        createListTag('Notes'),
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNotesPagesInfiniteQuery,
  useGetNoteQuery,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useCreateNoteMutation,
} = notesApiSlice;
