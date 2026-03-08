import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import CreateMealPage from './page';
import {useCreateMeal} from '@/lib/features/meals/use-meals';
import {useItems} from '@/lib/features/items/use-items';

jest.mock('@/lib/features/meals/use-meals', () => ({
  useCreateMeal: jest.fn()
}));

jest.mock('@/lib/features/items/use-items', () => ({
  useItems: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

const mockedMutateAsync = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useCreateMeal as jest.Mock).mockReturnValue({
    mutateAsync: mockedMutateAsync,
    isPending: false
  });
  (useItems as jest.Mock).mockReturnValue({
    data: [{id: 1, name: 'Rice'}, {id: 5, name: 'Chicken'}]
  });
});

describe('CreateMealPage', () => {
  test('renders form elements', () => {
    render(<CreateMealPage />);

    expect(screen.getByText('createMeal')).toBeInTheDocument();
    expect(screen.getByLabelText('Meal Name')).toBeInTheDocument();
  });

  test('shows validation error when submitting empty form', async () => {
    render(<CreateMealPage />);

    fireEvent.click(screen.getByRole('button', {name: /createMeal/i}));

    expect(
      await screen.findByText('Meal name is required')
    ).toBeInTheDocument();
  });
});
