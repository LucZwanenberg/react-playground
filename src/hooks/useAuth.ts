import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/defaultStore';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchCurrentAuthEntity } from '../redux/auth/actions';


const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentAuthEntity());
  }, [dispatch]);

  return auth;
};

export default useAuth;
