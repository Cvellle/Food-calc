import {fetchWithAuth} from '@/hooks/useFetchWithAuth';
import {RootState} from '@/lib/store';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface IUser {
  id: number;
  name: string;
  email: string;
  roles: Record<string, number>;
  profile_image: any;
}

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isInitialized: false
};

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth('/auth/me');
      if (!response.ok) throw new Error('Unauthorized');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = 'Not authenticated';
        state.isInitialized = true;
      });
  }
});

export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectIsAuthInitialized = (state: RootState) =>
  state.auth.isInitialized;

export const {logout} = authSlice.actions;
export default authSlice.reducer;
