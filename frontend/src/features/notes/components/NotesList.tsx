import { Center, Flex, Stack } from '@chakra-ui/react';
import { useGetNotesPagesInfiniteQuery } from '@/features/notes/notesApiSlice.ts';
import { useCallback, useMemo } from 'react';
import { NoteView } from '@/features/notes/components/NoteView.tsx';
import { ProgressCircle } from '@/components/ui/progress-circle.tsx';
import { useIntersectionObserver } from '@/app/hooks/use-intersection-observer';
import type { Note } from '@/features/notes/interfaces/note.interface.ts';
import { useAppSelector } from '@/app/hooks.ts';
import { selectFilters } from '@/features/notes/notesSlice.ts';
import { EmptyState } from '@/components/ui/empty-state.tsx';
import { RiEmotionUnhappyFill } from 'react-icons/ri';

export type NotesListProps = {
  onEdit: (note: Note) => void;
};

export function NotesList({ onEdit }: NotesListProps) {
  const filters = useAppSelector(selectFilters);
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useGetNotesPagesInfiniteQuery({ filters });
  const handleIntersect = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setTimeout(() => void fetchNextPage(), 500);
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const observerRef = useIntersectionObserver<HTMLDivElement>(handleIntersect, {
    threshold: 0,
  });

  const notes = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data],
  );

  return (
    <Stack h={'full'} overflow={'hidden'}>
      <Flex
        overflowY={'auto'}
        flex={'1'}
        gap={4}
        direction={'column-reverse'}
        justify={'flex-start'}
      >
        {notes.length ? (
          notes.map(note => (
            <NoteView key={note.id} note={note} onEdit={onEdit} />
          ))
        ) : (
          <Center>
            <EmptyState
              title={'Ничего не найдено'}
              icon={<RiEmotionUnhappyFill />}
            />
          </Center>
        )}
        {hasNextPage && (
          <Center ref={observerRef} p={4}>
            <ProgressCircle value={null} />
          </Center>
        )}
      </Flex>
    </Stack>
  );
}
