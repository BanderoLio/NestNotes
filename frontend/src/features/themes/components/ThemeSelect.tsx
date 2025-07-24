import { useGetThemesListQuery } from '@/features/themes/themesApiSlice.ts';
import { ComponentError } from '@/components/ComponentError.tsx';
import { Flex } from '@chakra-ui/react';
import { ThemeOption } from '@/features/themes/components/ThemeOption.tsx';
import { useMemo } from 'react';

export type ThemeSelectProps = {
  value?: number;
  onChange: (id: number) => void;
  amount?: number;
};

export function ThemeSelect({ onChange, value, amount = 5 }: ThemeSelectProps) {
  const { data, isError } = useGetThemesListQuery();
  const themes = useMemo(() => {
    const themes = data?.data.slice(0, amount);
    if (value && data) {
      const theme = data.data.find(theme => theme.id === value);
      if (!theme)
        throw new Error(
          `ThemeSelect: Theme with id ${String(value)} not found`,
        );
      if (!themes?.find(val => val.id === theme.id)) themes?.push(theme);
    }
    return themes;
  }, [data, value, amount]);
  if (isError) {
    return <ComponentError />;
  }
  return (
    <Flex gap={2} justify={'center'} direction={'row'} wrap={'wrap'}>
      {themes?.map(theme => (
        <ThemeOption
          key={theme.id}
          theme={theme}
          onClick={() => {
            onChange(theme.id);
          }}
          isSelected={value === theme.id}
        />
      ))}
    </Flex>
  );
}
