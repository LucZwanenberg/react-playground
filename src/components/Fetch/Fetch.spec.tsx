import '@testing-library/jest-dom'
import { render, fireEvent, screen, within } from '@testing-library/react'
import Fetch from './Fetch'


describe("Fetch", () => {
  describe("initial state", () => {
    it("shows button", async () => {
      // arrange
      render(<Fetch text="Hello world!" />);

      // assert
      expect(screen.getByRole('button'))
        .toHaveTextContent('Click me');
    });

    it("does not show text", async () => {
      // arrange
      render(<Fetch text="Hello world!" />);

      // assert
      expect(screen.getByRole('heading'))
        .not.toHaveTextContent('Hello world!');
    });
  });

  describe("when user clicks button", () => {
    it("hides button", async () => {
      // arrange
      render(<Fetch text="Hello world!" />);

      // act
      fireEvent.click(screen.getByText('Click me'))

      // assert
      expect(screen.queryByRole('button'))
        .toBeNull();
    });

    it("shows given text", async () => {
      // arrange
      render(<Fetch text="Hello world!" />);

      // act
      fireEvent.click(screen.getByText('Click me'))

      // assert
      expect(screen.getByRole('heading'))
        .toHaveTextContent('Hello world!');
    });
  });
});
