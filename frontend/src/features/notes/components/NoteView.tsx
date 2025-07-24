import type { Note } from '@/features/notes/interfaces/note.interface.ts';
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDeleteNoteMutation } from '@/features/notes/notesApiSlice.ts';
import { MdDelete, MdUpdate } from 'react-icons/md';

export type NoteViewProps = {
  note: Note;
  onEdit: (note: Note) => void;
};

export function NoteView({ note, onEdit }: NoteViewProps) {
  const [deleteNote] = useDeleteNoteMutation();
  return (
    <Stack bg={'bg.muted'} p={4} textAlign={'center'}>
      <Flex position={'relative'} justify={'space-between'}>
        <Heading position={'absolute'} left={'0'} right={'0'} size={'2xl'}>
          {String(note.id) + ' ' + (note.title ?? 'Без названия')}
        </Heading>
        <HStack ml={'auto'}>
          <IconButton
            onClick={() => {
              onEdit(note);
            }}
          >
            <MdUpdate />
          </IconButton>
          <IconButton
            onClick={() => {
              void deleteNote(note.id);
            }}
          >
            <MdDelete />
          </IconButton>
        </HStack>
      </Flex>
      <Separator />
      <Box>
        <Heading size={'xl'}>{note.theme?.name ?? 'Без темы'}</Heading>
        <Center>
          <Text
            whiteSpace={'pre-wrap'}
            p={4}
            textAlign={'left'}
            overflowWrap={'anywhere'}
            overflowX={'auto'}
            overflowY={'auto'}
            maxH={'xl'}
          >
            {note.content}
          </Text>
        </Center>
      </Box>
    </Stack>
  );
}
