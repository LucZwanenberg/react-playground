import authReducer, { fetchCurrentUser, setGuest, AuthState } from './authSlice';
import { AnyAction } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    }
  });

describe('authSlice', () => {
  test('should return the initial state', () => {
    const initialState: AuthState = { state: 'fetching' };

    const state = authReducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  test('should handle setGuest action', () => {
    const previousState: AuthState = { state: 'fetching' };

    const state = authReducer(previousState, setGuest());
    expect(state).toEqual({
      state: 'done',
      auth: { type: 'guest' },
    });
  });

  describe('fetchCurrentUser thunk', () => {
    test('should handle fetchCurrentUser.pending', () => {
      const pendingThunk = fetchCurrentUser.pending('fetchCurrentUser', undefined);
      const initialState: AuthState = { state: 'done', auth: { type: 'guest' } };

      const state = authReducer(initialState, pendingThunk);

      expect(state).toEqual({
        state: 'fetching',
      });
    });

    test('should handle fetchCurrentUser.fulfilled', async () => {
      const store = createTestStore();
      const { dispatch, getState } = store;

      await dispatch(fetchCurrentUser());

      const state = getState().auth;

      expect(state).toEqual({
        state: 'done',
        auth: {
          type: 'user',
          name: 'Mr. Foo',
          email: 'foo@example.org',
        },
      });
    });

    test('should handle fetchCurrentUser.rejected', async () => {
      const rejectedThunk = fetchCurrentUser.rejected(
        null,
        'fetchCurrentUser',
        undefined,
        { message: 'Failed to fetch user' }
      );

      const initialState: AuthState = { state: 'fetching' };

      const state = authReducer(initialState, rejectedThunk);

      expect(state).toEqual({
        state: 'error'
      });
    });
  });
});
