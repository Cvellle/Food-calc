import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import CreateMealPage from './page';
import {createMealAsync} from '@/services/meal.service';

jest.mock('@/services/meal.service', () => ({
  createMealAsync: jest.fn()
}));

const mockedCreateMealAsync = createMealAsync as jest.Mock;

describe('CreateMealPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements', () => {
    render(<CreateMealPage />);

    expect(screen.getByText('Create New Meal')).toBeInTheDocument();
    expect(screen.getByLabelText('Meal Name')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: /create meal/i})
    ).toBeInTheDocument();
  });

  test('shows validation error when submitting empty form', async () => {
    render(<CreateMealPage />);

    fireEvent.click(screen.getByRole('button', {name: /create meal/i}));

    expect(
      await screen.findByText('Meal name is required')
    ).toBeInTheDocument();
  });

  test('shows validation error for invalid item values', async () => {
    render(<CreateMealPage />);

    fireEvent.change(screen.getByLabelText('Meal Name'), {
      target: {value: 'Pizza'}
    });

    fireEvent.click(screen.getByRole('button', {name: /create meal/i}));

    expect(
      await screen.findByText('All items must have valid itemId and quantity')
    ).toBeInTheDocument();
  });

  test('submits form successfully and shows success message', async () => {
    mockedCreateMealAsync.mockResolvedValueOnce({id: 123});

    render(<CreateMealPage />);

    fireEvent.change(screen.getByLabelText('Meal Name'), {
      target: {value: 'Burger'}
    });

    fireEvent.change(screen.getAllByLabelText('Item ID')[0], {
      target: {value: '1'}
    });

    fireEvent.change(screen.getAllByLabelText('Quantity')[0], {
      target: {value: '2'}
    });

    fireEvent.click(screen.getByRole('button', {name: /create meal/i}));

    await waitFor(() => {
      expect(mockedCreateMealAsync).toHaveBeenCalledTimes(1);
    });

    expect(
      await screen.findByText('Meal created with id: 123')
    ).toBeInTheDocument();
  });

  test('shows error message on API failure', async () => {
    mockedCreateMealAsync.mockRejectedValueOnce(new Error('Server error'));

    render(<CreateMealPage />);

    fireEvent.change(screen.getByLabelText('Meal Name'), {
      target: {value: 'Soup'}
    });

    fireEvent.change(screen.getAllByLabelText('Item ID')[0], {
      target: {value: '5'}
    });

    fireEvent.change(screen.getAllByLabelText('Quantity')[0], {
      target: {value: '3'}
    });

    fireEvent.click(screen.getByRole('button', {name: /create meal/i}));

    expect(await screen.findByText('Server error')).toBeInTheDocument();
  });
});
