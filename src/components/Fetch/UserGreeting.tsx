import useAuth from "../../hooks/useAuth";

export default function UserGreeting() {
  const { auth } = useAuth();

  return (
    <div style={{ paddingBottom: "2em" }}>
      {auth.state === "fetching" && "Loading user..."}
      {auth.state === "done" && (auth.auth.type === "guest"
        ? "Hello, guest."
        : `Hello, ${auth.auth.name} (${auth.auth.email})`)}
    </div>
  )
}
