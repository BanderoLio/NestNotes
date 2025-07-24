import { useGetThemesListQuery } from '@/features/themes/themesApiSlice.ts';
import { ComponentError } from '@/components/ComponentError.tsx';
import type { ComboboxRootProps } from '@chakra-ui/react';
import {
  Button,
  Center,
  CloseButton,
  Combobox,
  createListCollection,
  Dialog,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { JSX } from 'react';
import { useMemo, useState } from 'react';
import { ThemeForm } from '@/features/themes/components/ThemeForm.tsx';
import type { CreateTheme } from '@/features/themes/interfaces/create-theme.interface.ts';

export type ThemeInputProps = {
  allowThemeCreate?: boolean;
  selectPortal?: boolean;
} & Omit<ComboboxRootProps, 'collection'>;

export function ThemeInput({
  allowThemeCreate = true,
  selectPortal,
  ...props
}: ThemeInputProps) {
  const { data: themes, isError } = useGetThemesListQuery();
  const [value, setValue] = useState<string>('');
  const collection = useMemo(
    () =>
      createListCollection({
        items: (themes?.data ?? []).filter(theme => theme.name.includes(value)),
        itemToString: item => item.name,
        itemToValue: item => String(item.id),
      }),
    [themes, value],
  );
  if (isError) {
    return <ComponentError />;
  }
  return (
    <Combobox.Root
      collection={collection}
      openOnClick
      {...props}
      onInputValueChange={e => {
        setValue(e.inputValue);
      }}
    >
      <Combobox.Control>
        <Combobox.Input placeholder={'Выбрать тему'} />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
          <Combobox.ClearTrigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal disabled={!selectPortal}>
        <Combobox.Positioner>
          <Combobox.Content maxH={'30vh'}>
            <Combobox.Empty>
              <Stack mt={1}>
                <Center>
                  <Text>Темы {value ? `"${value}"` : ''} не найдено</Text>
                </Center>
                {allowThemeCreate && (
                  <ThemeFormDialog
                    defaultTheme={{
                      name: value,
                    }}
                    trigger={
                      <Button size={'sm'} textAlign={'left'}>
                        Создать
                      </Button>
                    }
                  />
                )}
              </Stack>
            </Combobox.Empty>
            {collection.items.map(theme => (
              <Combobox.Item item={theme} key={theme.id}>
                {theme.name}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}

type ThemeFormDialogProps = {
  trigger: JSX.Element;
  defaultTheme?: CreateTheme;
};

function ThemeFormDialog({ trigger, defaultTheme }: ThemeFormDialogProps) {
  return (
    <Dialog.Root lazyMount={true} placement={'center'}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={6} w={'fit-content'}>
            <Dialog.Context>
              {store => (
                <Dialog.Body pt="6" spaceY="3">
                  <Center>
                    <ThemeForm
                      onSuccessful={() => {
                        store.setOpen(false);
                      }}
                      selectPortal={false}
                      defaultTheme={defaultTheme}
                    />
                  </Center>
                </Dialog.Body>
              )}
            </Dialog.Context>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
