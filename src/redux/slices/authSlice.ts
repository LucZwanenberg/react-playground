import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthEntity } from '../../types/Auth';

export type AuthState = {
  state: "fetching";
} | {
  state: "error";
} | {
  state: "done";
  auth: AuthEntity;
};

const initialState = { state: "fetching" } as AuthState;

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      // TODO dependency injection here
      return { name: "Mr. Foo", email: "foo@example.org" };
    } catch (error) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setGuest: (): AuthState => ({
      state: "done",
      auth: { type: "guest" }
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (_state: AuthState) => ({
        state: "fetching"
      }))
      .addCase(fetchCurrentUser.rejected, (_state: AuthState) => ({
        state: 'error',
      }))
      .addCase(fetchCurrentUser.fulfilled, (_state: AuthState, action) => ({
        state: 'done',
        auth: {
          type: 'user',
          name: action.payload.name,
          email: action.payload.email
        }
      }))
  },
});

export const { setGuest } = authSlice.actions;

export default authSlice.reducer;
