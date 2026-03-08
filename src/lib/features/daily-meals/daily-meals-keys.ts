export const dailyMealsKeys = {
  all: ['daily-meals'] as const,
  list: () => [...dailyMealsKeys.all, 'list'] as const,
  selectedDate: () => [...dailyMealsKeys.all, 'selected-date'] as const
};
