const LIST = 'LIST';

export type Tag<T extends string> = {
  id: number | string;
  type: T;
};

type IdResult = { id: number | string };
type TreeRoot = IdResult & {
  children: TreeRoot[];
};

export function createListTag<T extends string>(type: T): Tag<T> {
  return {
    id: LIST,
    type,
  };
}

export function createIdTag<T extends string>(
  id: number | string,
  type: T,
): Tag<T> {
  return {
    id,
    type,
  };
}

export function providedList<T extends string>(
  resultsArray: IdResult[] | undefined,
  tagType: T,
): Tag<T>[] {
  return resultsArray
    ? [
        ...resultsArray.map((res: IdResult) => ({ type: tagType, id: res.id })),
        createListTag(tagType),
      ]
    : [createListTag(tagType)];
}

export function providedTree<T extends string>(
  resultsTree: TreeRoot[] | undefined,
  tagType: T,
  provideListTag = true,
): Tag<T>[] {
  const tags: Tag<T>[] = [];
  resultsTree?.forEach(({ id, children }) => {
    tags.push({ id, type: tagType });
    if (children.length) tags.push(...providedTree(children, tagType, false));
  });
  if (provideListTag) tags.push({ id: LIST, type: tagType });
  return tags;
}

export function provided<T extends string>(id: number | string, tagType: T) {
  return [{ type: tagType, id }];
}
