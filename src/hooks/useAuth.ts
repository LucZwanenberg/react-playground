import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth;
};

export default useAuth;
