import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from '../../redux/slices/authSlice';
import { AppDispatch } from "../../redux/store";

export default function UserGreeting() {
  const dispatch: AppDispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div style={{ paddingBottom: "2em" }}>
      {auth.state === "fetching" && "Loading user..."}
      {auth.state === "error" && "Error: could not load user."}
      {auth.state === "done" && (auth.auth.type === "guest"
        ? "Hello, guest."
        : `Hello, ${auth.auth.name} (${auth.auth.email})`)}
    </div>
  )
}
