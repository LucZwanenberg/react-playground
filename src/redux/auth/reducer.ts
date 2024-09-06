import { Auth } from "../../domain/Auth";

const initialState: Auth = {
  type: 'loading',
};

const reducer = (state = initialState, action: any): Auth => {
  switch (action.type) {
    case 'SET_AUTH_USER':
      const { payload } = action;
      return {
        type: 'user', user: {
          name: `${payload.first_name} ${payload.last_name}`,
          email: payload.email
        }
      };
    case 'SET_GUEST':
      return { type: 'guest' };
    default:
      return state;
  }
};

export default reducer;
