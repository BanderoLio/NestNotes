import { Button } from '@chakra-ui/react';
import type { Theme } from '@/features/themes/interfaces/theme.interface.ts';
import type { MouseEventHandler } from 'react';

type ThemeOptionProps = {
  theme: Theme;
  onClick: MouseEventHandler;
  isSelected: boolean;
};

export function ThemeOption({
  theme,
  onClick,
  isSelected = false,
}: ThemeOptionProps) {
  return (
    <Button
      rounded={'full'}
      h={'min-content'}
      py={1}
      variant={isSelected ? 'solid' : 'outline'}
      onClick={onClick}
    >
      {theme.name}
    </Button>
  );
}
