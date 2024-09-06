import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Fetch from './HiddenText';
import { act } from 'react';
import createStore from '../../redux/createStore';
import initServiceContainer from '../../bootstrap/initServiceContainer';
import AuthenticationApiMock from '../../mocks/AuthenticationApiMock';

export const store = createStore(
  initServiceContainer({
    authenticationAPI: new AuthenticationApiMock(
      () => new Promise(resolve => resolve(null))
    )
  })
);

describe("HiddenText", () => {
  describe("initial state", () => {
    it("shows button", async () => {
      // arrange
      render(<Provider store={store}>
        <Fetch text="Hello world!" />
      </Provider>);

      // assert
      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveTextContent('Click me');
      });
    });

    it("does not show text", async () => {
      // arrange
      render(<Provider store={store}>
        <Fetch text="Hello world!" />
      </Provider>);

      // assert
      await waitFor(() => {
        expect(screen.getByRole('heading'))
          .not.toHaveTextContent('Hello world!');
      });
    });

    describe("when user clicks button", () => {
      it("hides button", async () => {
        // arrange
        render(<Provider store={store}>
          <Fetch text="Hello world!" />
        </Provider>);

        // act
        fireEvent.click(screen.getByText('Click me'));

        // assert
        await waitFor(() => {
          expect(screen.queryByRole('button'))
            .toBeNull();
        });
      });

      it("shows given text", async () => {
        // arrange
        render(<Provider store={store}>
          <Fetch text="Hello world!" />
        </Provider>);

        // act
        act(() => {
          fireEvent.click(screen.getByText('Click me'));
        });

        // assert
        await waitFor(() => {
          expect(screen.getByRole('heading'))
            .toHaveTextContent('Hello world!');

        });
      });
    });
  });
});
