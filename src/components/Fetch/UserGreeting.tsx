import useAuth from "../../hooks/useAuth";

export default function UserGreeting() {
  const auth = useAuth();

  return (
    <div style={{ paddingBottom: "2em" }}>
      {auth.type == "loading" && "Loading..."}
      {auth.type == "guest" && "Hello, guest."}
      {auth.type == "user" && `${auth.user.name} (${auth.user.email})`}
    </div>
  )
}
