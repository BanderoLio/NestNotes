import { HStack, IconButton, Input, Stack, Textarea } from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateNote } from '@/features/notes/interfaces/create-note.interface.ts';
import { createNoteSchema } from '@/features/notes/interfaces/create-note.interface.ts';
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '@/features/notes/notesApiSlice.ts';
import { MdMessage } from 'react-icons/md';
import type { KeyboardEventHandler } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { ThemeSelect } from '@/features/themes/components/ThemeSelect.tsx';
import { ThemeInput } from '@/features/themes/components/ThemeInput.tsx';
import type { Note } from '@/features/notes/interfaces/note.interface.ts';
import { useCallbackStable } from '@/app/hooks/use-callback-stable.ts';

export type InputBarProps = {
  note: Note | null;
  onEditFinished?: () => void;
};

export function InputBar({ note, onEditFinished }: InputBarProps) {
  const { register, control, reset, handleSubmit } = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
    values: note
      ? {
          title: note.title ?? undefined,
          themeId: note.theme?.id,
          content: note.content,
        }
      : undefined,
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const registerContent = register('content');
  const [
    createNote,
    {
      error: createError,
      isError: isCreateError,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
    },
  ] = useCreateNoteMutation();
  const [
    updateNote,
    {
      error: updateError,
      isError: isUpdateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateNoteMutation();
  const { error, isError, isLoading, isSuccess } = {
    error: note ? updateError : createError,
    isError: note ? isUpdateError : isCreateError,
    isLoading: note ? isUpdateLoading : isCreateLoading,
    isSuccess: note ? isUpdateSuccess : isCreateSuccess,
  };
  const handleSuccess = useCallbackStable(() => {
    reset();
    textAreaRef.current?.focus();
    onEditFinished?.();
  });
  useEffect(() => {
    if (isError) console.log('Backend response', error);
  }, [error, isError]);
  useEffect(() => {
    if (isSuccess) {
      handleSuccess();
    }
  }, [isSuccess, handleSuccess]);
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };
  const onSubmit: SubmitHandler<CreateNote> = useCallback(
    data => {
      if (note) {
        void updateNote({
          id: note.id,
          body: data,
        });
      } else {
        void createNote(data);
      }
    },
    [createNote, note, updateNote],
  );
  return (
    <form noValidate ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Controller
          render={({ field: { onChange, value } }) => (
            <>
              <ThemeSelect value={value} onChange={onChange} />
              <ThemeInput
                value={[String(value)]}
                onValueChange={e => {
                  const val = e.value.at(0);
                  onChange(val ? +val : undefined);
                }}
              />
            </>
          )}
          control={control}
          name={'themeId'}
        />
        <HStack
          bg={'bg.subtle'}
          w={'100%'}
          gap={5}
          px={4}
          py={2}
          borderWidth={'2px'}
          borderColor={'fg.subtle'}
        >
          <Stack h={'fit-content'} w={'full'}>
            <Textarea
              // variant={'flushed'}
              placeholder={'Написать заметку...'}
              autoresize
              maxH={'15lh'}
              onKeyDown={handleKeyDown}
              autoFocus
              {...registerContent}
              ref={e => {
                registerContent.ref(e);
                textAreaRef.current = e;
              }}
            />
            <Input
              variant={'flushed'}
              placeholder={'Название заметки'}
              size={'xs'}
              {...register('title', {
                setValueAs: (val: string) => (val === '' ? undefined : val),
              })}
            />
          </Stack>
          <IconButton type={'submit'} rounded={'full'} loading={isLoading}>
            <MdMessage />
          </IconButton>
        </HStack>
      </Stack>
    </form>
  );
}
