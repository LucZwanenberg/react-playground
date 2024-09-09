import { render, screen } from '@testing-library/react';
import { UserGreetingView } from './UserGreeting';
import { Auth, User } from '../../domain/Auth';

/**
 * Approach 1: only test the view
 * Pros:
 *  - Easy to set up
 * 
 * Cons:
 *  - Hook configuration still needs to be validated at higher level
 *    in the testing pyramid.
 */
describe('UserGreetingView', () => {
  it('should display "Loading..." when auth.type is "loading"', () => {
    // arrange
    const auth: Auth = { type: 'loading' };

    // act
    render(<UserGreetingView auth={auth} />);

    // assert
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display "Hello, guest." when auth.type is "guest"', () => {
    // arrange
    const auth: Auth = { type: 'guest' };

    // act
    render(<UserGreetingView auth={auth} />);

    // assert
    expect(screen.getByText('Hello, guest.')).toBeInTheDocument();
  });

  it('should display user name and email when auth.type is "user"', () => {
    // arrange
    const user: User = { name: 'John Doe', email: 'john.doe@example.com' };
    const auth: Auth = { type: 'user', user };

    // act
    render(<UserGreetingView auth={auth} />);

    // assert
    expect(screen.getByText('Hello, John Doe (john.doe@example.com)')).toBeInTheDocument();
  });
});
