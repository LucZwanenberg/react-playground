import '@testing-library/jest-dom'
import useAuth, { AuthState } from '../../hooks/useAuth';
import { render, screen } from '@testing-library/react';
import UserGreeting from './UserGreeting';

jest.mock('../../hooks/useAuth');

describe("UserGreeting", () => {
  it('displays loading message when auth state is fetching', () => {
    const auth: AuthState = {
      state: "fetching"
    };

    (useAuth as jest.Mock).mockReturnValue({ auth });

    render(<UserGreeting />);

    expect(screen.queryByText('Loading user...'))
      .toBeInTheDocument();
  });

  it('welcomes guests', () => {
    const auth: AuthState = {
      state: "done",
      auth: { type: "guest" }
    };

    (useAuth as jest.Mock).mockReturnValue({ auth });

    render(<UserGreeting />);

    expect(screen.queryByText('Loading user...'))
      .not.toBeInTheDocument();
    expect(screen.queryByText('Hello, guest.'))
      .toBeInTheDocument();
  });

  it('welcomes users personally', () => {
    const auth: AuthState = {
      state: "done",
      auth: {
        type: "user",
        id: 123,
        name: "Henk Foo",
        email: "henk.foo@example.example"
      }
    };

    (useAuth as jest.Mock).mockReturnValue({ auth });

    render(<UserGreeting />);

    expect(screen.queryByText('Loading user...'))
      .not.toBeInTheDocument();
    expect(screen.queryByText('Hello, Henk Foo (henk.foo@example.example)'))
      .toBeInTheDocument();
  });
});