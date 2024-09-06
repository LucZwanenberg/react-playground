import { Dispatch } from 'redux';
import ServiceContainer from '../../bootstrap/ServiceContainer';
import { User } from '../../api/IAuthenticationAPI';

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_GUEST = 'SET_GUEST';

export const fetchCurrentAuthEntity = () => {
  return async (dispatch: Dispatch, _getState: any, app: ServiceContainer) => {
    try {
      const user: User | null =
        await app.authenticationAPI.fetchCurrentUser();

      if (user !== null) {
        dispatch({
          type: SET_AUTH_USER,
          payload: user,
        });
      } else {
        dispatch({
          type: SET_GUEST,
        });
      }
    } catch (error) {
      console.error('Error fetching authentication status:', error);
    }
  };
};
