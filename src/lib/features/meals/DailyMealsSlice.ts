import type {
  MealResponse,
  NutrientEntry,
  Suggestion
} from '@/lib/nutrition/types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import {endpoint} from '../../../../config/endpoint';
import {RootState} from '@/lib/store';

export const selectMeals = (state: RootState) => state.dailyMeals.meals;

export const selectAggregatedNutrients = createSelector(
  [selectMeals],
  (meals) => {
    const totals: Record<string, NutrientEntry> = {};

    meals.forEach((meal) => {
      meal.nutrients.forEach((n) => {
        if (!totals[n.nutrient]) {
          totals[n.nutrient] = {...n};
        } else {
          totals[n.nutrient].total += n.total;
        }
      });
    });

    return totals;
  }
);

export const fetchAndAddMeal = createAsyncThunk<
  MealResponse,
  string,
  {rejectValue: string}
>('dailyMeals/fetchAndAddMeal', async (mealId, {rejectWithValue}) => {
  try {
    const res = await fetch(`${endpoint}/meals/${mealId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch meal');
    }

    return (await res.json()) as MealResponse;
  } catch (err) {
    return rejectWithValue('Unable to load meal');
  }
});

type DailyMealsState = {
  meals: MealResponse[];
  suggestions: Suggestion[];
  loading: boolean;
  error: string | null;
};

const initialState: DailyMealsState = {
  meals: [],
  suggestions: [],
  loading: false,
  error: null
};

const dailyMealsSlice = createSlice({
  name: 'dailyMeals',
  initialState,
  reducers: {
    removeMeal(state, action: PayloadAction<number>) {
      state.meals.splice(action.payload, 1);
    },
    clearDay(state) {
      state.meals = [];
    },
    setSuggestions(state, action: PayloadAction<Suggestion[]>) {
      state.suggestions = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndAddMeal.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAndAddMeal.fulfilled, (state, action) => {
        console.log(123, action.payload);
        state.meals.push(action.payload);
      })
      .addCase(fetchAndAddMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  }
});

export const {removeMeal, clearDay, setSuggestions} = dailyMealsSlice.actions;

export default dailyMealsSlice.reducer;
