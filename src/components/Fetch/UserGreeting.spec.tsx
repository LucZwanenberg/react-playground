import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import UserGreeting from "./UserGreeting";
import useAuth from "../../hooks/useAuth"; // Adjust path to the hook
import { AppDispatch } from "../../redux/store"; // Import AppDispatch from store

jest.mock("../../hooks/useAuth");
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("UserGreeting component", () => {
  const mockDispatch = jest.fn() as unknown as AppDispatch;

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as any as jest.Mock).mockReturnValue(mockDispatch);
  });

  test("displays 'Loading user...' when auth state is fetching", () => {
    (useAuth as jest.Mock).mockReturnValue({ state: "fetching" });

    render(<UserGreeting />);

    expect(screen.getByText("Loading user...")).toBeInTheDocument();
  });

  test("displays error message when auth state is error", () => {
    (useAuth as jest.Mock).mockReturnValue({ state: "error" });

    render(<UserGreeting />);

    expect(screen.getByText("Error: could not load user.")).toBeInTheDocument();
  });

  test("displays 'Hello, guest.' when auth state is done with guest user", () => {
    (useAuth as jest.Mock).mockReturnValue({
      state: "done",
      auth: { type: "guest" },
    });

    render(<UserGreeting />);

    expect(screen.getByText("Hello, guest.")).toBeInTheDocument();
  });

  test("displays user's name and email when auth state is done with user auth", () => {
    (useAuth as jest.Mock).mockReturnValue({
      state: "done",
      auth: { type: "user", name: "Mr. Foo", email: "foo@example.org" },
    });

    render(<UserGreeting />);

    expect(
      screen.getByText("Hello, Mr. Foo (foo@example.org)")
    ).toBeInTheDocument();
  });
});
