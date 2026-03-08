export const mealsKeys = {
  all: ['meals'] as const,
  lists: () => [...mealsKeys.all, 'list'] as const,
  detail: (id: number | string) => [...mealsKeys.all, 'detail', String(id)] as const
};
