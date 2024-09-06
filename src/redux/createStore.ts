import { configureStore } from "@reduxjs/toolkit";
import ServiceContainer from "../bootstrap/ServiceContainer";
import rootReducer from "./rootReducer";

const createStore = (serviceContainer: ServiceContainer) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: serviceContainer,
        },
      }),
  });
  return store;
};

export default createStore;
