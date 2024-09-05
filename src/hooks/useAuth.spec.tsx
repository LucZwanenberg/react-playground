import React from "react";
import useAuth, { AuthProvider, Guest, User } from './useAuth'; // Adjust the import path as necessary
import { renderHook, waitFor } from "@testing-library/react";


const createWrapper = ({ getUser }: { getUser: () => Promise<User | Guest | null> }) =>
  ({ children }: { children: React.ReactNode; }) =>
    <AuthProvider getUser={getUser}>{children}</AuthProvider>;


describe('useAuth Hook', () => {
  it('should have state fetching while fetching', async () => {
    // arrange
    const getUser = async (): Promise<User | null> =>
      new Promise(() => { });

    // act
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({ getUser })
    });

    // assert
    await waitFor(() => expect(result.current.auth)
      .toMatchObject({
        state: "fetching"
      }));
  });

  it('should update to guest state after fetching guest', async () => {
    // arrange
    const getUser = async (): Promise<User | Guest | null> => ({
      type: 'guest'
    });

    // act
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({ getUser })
    });

    // assert
    await waitFor(() => expect(result.current.auth)
      .toMatchObject({
        state: "done",
        auth: {
          type: "guest"
        }
      }));
  });

  it('should update to user state after fetching user', async () => {
    // arrange
    const getUser = async (): Promise<User | null> => ({
      type: 'user',
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    // act
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({ getUser })
    });

    // assert
    await waitFor(() => expect(result.current.auth)
      .toMatchObject({
        state: "done",
        auth: {
          type: "user",
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        }
      }));
  });
});
