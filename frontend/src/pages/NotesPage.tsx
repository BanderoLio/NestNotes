import { Container, SimpleGrid } from '@chakra-ui/react';
import { AuthGuard } from '@/features/auth/components/AuthGuard.tsx';
import { NotesView } from '@/features/notes/components/NotesView.tsx';
import { ThemeTree } from '@/features/themes/components/ThemeTree.tsx';

export function NotesPage() {
  return (
    <>
      <Container py={4} h={'100dvh'} overflow={'hidden'}>
        <AuthGuard />
        <SimpleGrid
          h={'full'}
          columns={{ lg: 2, base: 1 }}
          gap={4}
          overflow={'auto'}
        >
          <ThemeTree />
          <NotesView />
        </SimpleGrid>
      </Container>
    </>
  );
}
