import createStore from './createStore';
import initServiceContainer from '../bootstrap/initServiceContainer';

export const defaultStore = createStore(initServiceContainer());

export type RootState = ReturnType<typeof defaultStore.getState>;
export type AppDispatch = typeof defaultStore.dispatch;

export default defaultStore;
