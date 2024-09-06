import { render, screen, waitFor } from '@testing-library/react';
import UserGreeting from './UserGreeting';
import { Provider } from 'react-redux';
import baseCreateStore from '../../redux/createStore';
import initServiceContainer from '../../bootstrap/initServiceContainer';
import IAuthenticationApi, { User } from '../../services/authentication/IAuthenticationApi';

/**
 * Approach 2: test both the container and the view
 * Pros:
 *  - More coverage and significance of test for minimal additional running time
 * 
 * Cons:
 *  - Requires more boilerplate code to set up
 */
class AuthenticationApiMock implements IAuthenticationApi {
  private _fetchCurrentUser: () => Promise<User | null>;

  constructor(fetchCurrentUser: () => Promise<User | null>) {
    this._fetchCurrentUser = fetchCurrentUser;
  }

  public async fetchCurrentUser(): Promise<User | null> {
    return this._fetchCurrentUser();
  }
}

const createStore = ({ authenticationAPI }: { authenticationAPI: Promise<User | null> }) =>
  baseCreateStore(
    initServiceContainer({
      authenticationAPI: new AuthenticationApiMock(
        () => authenticationAPI
      )
    })
  );

describe("UserGreeting", () => {
  it('should display "Loading..." while user is being fetched', () => {
    // arrange
    const store = createStore({
      authenticationAPI: new Promise(() => { })
    });

    // act
    render(
      <Provider store={store}>
        <UserGreeting />
      </Provider>
    );

    // assert
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should welcome guest when API returns null', async () => {
    // arrange
    const store = createStore({
      authenticationAPI: new Promise((resolve) => resolve(null))
    });

    // act
    render(
      <Provider store={store}>
        <UserGreeting />
      </Provider>
    );

    // assert
    await waitFor(() => {
      expect(screen.queryByText('Hello, guest.'))
        .toBeInTheDocument()
    });
  });

  it('should display user info when API returns user', async () => {
    // arrange
    const store = createStore({
      authenticationAPI: new Promise((resolve) => resolve({
        first_name: "Foo",
        last_name: "Barssen",
        email: "foo.barssen@example.org"
      }))
    });

    // act
    render(
      <Provider store={store}>
        <UserGreeting />
      </Provider>
    );

    // assert
    await waitFor(() => {
      expect(screen.queryByText('Foo Barssen (foo.barssen@example.org)'))
        .toBeInTheDocument()
    });
  });
});
