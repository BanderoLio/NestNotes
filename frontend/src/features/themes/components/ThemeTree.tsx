import { useGetThemesTreeQuery } from '@/features/themes/themesApiSlice.ts';
import { ComponentError } from '@/components/ComponentError.tsx';
import { useEffect, useMemo, useState } from 'react';
import type { TreeViewNodeRenderProps } from '@chakra-ui/react';
import {
  createTreeCollection,
  Highlight,
  IconButton,
  Input,
  Stack,
  TreeView,
  useFilter,
} from '@chakra-ui/react';
import type { TreeTheme } from '@/features/themes/interfaces/tree-theme.interface.ts';
import { MdCircle, MdTopic } from 'react-icons/md';
import { Tooltip } from '@/components/ui/tooltip.tsx';
import { useAppDispatch } from '@/app/hooks.ts';
import { updateFilters } from '@/features/notes/notesSlice.ts';

function ThemeFilterButton() {
  const dispatch = useAppDispatch();
  return (
    <Tooltip content={'Искать по теме'}>
      <IconButton
        variant={'plain'}
        onClick={e => {
          e.stopPropagation();
          dispatch(
            updateFilters({
              themeIds: [22, 23],
            }),
          );
        }}
      >
        <MdCircle />
      </IconButton>
    </Tooltip>
  );
}

export function ThemeTree() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);
  const { data, isError, error } = useGetThemesTreeQuery();
  const filter = useFilter({ sensitivity: 'base' });
  const collection = useMemo(() => {
    return createTreeCollection<TreeTheme>({
      rootNode: {
        id: Number.MAX_SAFE_INTEGER,
        name: '',
        children: data?.data ?? [],
      },
      nodeToString: node => node.name,
      nodeToValue: node => String(node.id),
    }).filter(theme => filter.contains(theme.name, query));
  }, [data, filter, query]);
  useEffect(() => {
    if (isError) console.error(error);
  }, [isError, error]);
  if (isError) {
    return <ComponentError />;
  }
  return (
    <Stack gap="3">
      <Input
        size="sm"
        placeholder={'Поиск по теме'}
        onChange={e => {
          setQuery(e.target.value);
          setExpanded(
            e.target.value === '' ? [] : collection.getBranchValues(),
          );
        }}
      />

      <TreeView.Root
        collection={collection}
        expandedValue={expanded}
        onExpandedChange={details => {
          setExpanded(details.expandedValue);
        }}
      >
        <TreeView.Label srOnly>Tree</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Node
            indentGuide={<TreeView.BranchIndentGuide />}
            render={({
              node,
              nodeState,
            }: TreeViewNodeRenderProps<TreeTheme>) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <MdTopic />
                  <TreeView.BranchText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: 'gray.emphasized' }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.BranchText>
                  <ThemeFilterButton />
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <MdTopic />
                  <TreeView.ItemText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: 'gray.emphasized' }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.ItemText>
                  <ThemeFilterButton />
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </Stack>
  );
}
