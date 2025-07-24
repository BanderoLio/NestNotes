import { HStack, IconButton, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip.tsx';
import { IoReload } from 'react-icons/io5';

export function ComponentError() {
  const onClick = () => {
    window.location.reload();
  };
  return (
    <HStack>
      <Text color={'fg.error'}>
        Что-то пошло не так при отображении компонента. Попробуйте перезагрузить
        страницу
      </Text>
      <Tooltip content={'Перезагрузить страницу'}>
        <IconButton onClick={onClick}>
          <IoReload />
        </IconButton>
      </Tooltip>
    </HStack>
  );
}
