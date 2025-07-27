import type { SwitchCheckedChangeDetails } from '@chakra-ui/react';
import { Group } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Field, Fieldset } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { HStack, Stack } from '@chakra-ui/react';
import { ThemeTree } from '@/features/themes/components/ThemeTree.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { useAppDispatch } from '@/app/hooks.ts';
import {
  resetFilters,
  updateFilters,
  updateFiltersSettings,
} from '@/features/notes/notesSlice.ts';
import { MdBackspace } from 'react-icons/md';
import { Tooltip } from '@/components/ui/tooltip.tsx';
import type { MouseEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { NotesFilters } from '@/features/notes/interfaces/notes-filters.interface.ts';
import { notesFiltersSchema } from '@/features/notes/interfaces/notes-filters.interface.ts';
import { zodResolver } from '@hookform/resolvers/zod';

function ThemeTreeSwitch() {
  const dispatch = useAppDispatch();
  const onCheckedChange = (details: SwitchCheckedChangeDetails) => {
    dispatch(
      updateFiltersSettings({
        themeIdsWithChildren: details.checked,
      }),
    );
  };
  return <Switch onCheckedChange={onCheckedChange}>Вместе с подтемами</Switch>;
}

function ResetButton() {
  const dispatch = useAppDispatch();
  const onClick: MouseEventHandler = () => {
    dispatch(resetFilters());
  };
  return (
    <Tooltip content={'Убрать фильтры'}>
      <IconButton variant={'ghost'} ml={'auto'} onClick={onClick}>
        <MdBackspace />
      </IconButton>
    </Tooltip>
  );
}

function NotesInputs() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<NotesFilters>({
    resolver: zodResolver(notesFiltersSchema),
  });
  const onSubmit: SubmitHandler<NotesFilters> = data => {
    dispatch(updateFilters(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Legend>
          <Heading size={'lg'}>🔍 Поиск по заметкам</Heading>
        </Fieldset.Legend>
        <Fieldset.Content>
          <Group>
            <Field.Root>
              <Input placeholder={'Название заметки'} {...register('title')} />
            </Field.Root>
            <Field.Root>
              <Input placeholder={'Содержимое'} {...register('content')} />
            </Field.Root>
          </Group>
          <Button variant={'subtle'} type={'submit'}>
            Искать
          </Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}

export function NotesFilters() {
  return (
    <Stack gap={4}>
      <NotesInputs />
      <ThemeTree />
      <HStack px={4}>
        <ThemeTreeSwitch />
        <ResetButton />
      </HStack>
    </Stack>
  );
}
