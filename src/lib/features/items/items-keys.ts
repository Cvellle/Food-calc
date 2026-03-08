export const itemsKeys = {
  all: ['items'] as const,
  list: () => [...itemsKeys.all, 'list'] as const
};
