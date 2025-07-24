import { Stack } from '@chakra-ui/react';
import { InputBar } from '@/features/notes/components/InputBar.tsx';
import { NotesList } from '@/features/notes/components/NotesList.tsx';
import { useEffect, useState } from 'react';
import type { Note } from '@/features/notes/interfaces/note.interface.ts';

export function NotesView() {
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    console.log(editingNote);
  }, [editingNote]);
  return (
    <Stack gap={4} h={'full'} overflow={'auto'}>
      <NotesList onEdit={setEditingNote} />
      <InputBar
        note={editingNote}
        onEditFinished={() => {
          setEditingNote(null);
        }}
      />
    </Stack>
  );
}
