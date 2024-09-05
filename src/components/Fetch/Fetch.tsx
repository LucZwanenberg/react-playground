import { useState } from "react"
import useAuth from "../../hooks/useAuth";

export default function Fetch({ text }: { text: string }) {
  const [clicked, setClicked] = useState(false);
  const onClick = () => setClicked(true);
  const { auth } = useAuth();

  return (
    <div role="heading">
      <div style={{ paddingBottom: "2em" }}>
        {auth.state === "fetching" && "Loading user..."}
        {auth.state === "done" && (auth.auth.type === "guest"
          ? "Hello, guest."
          : `Hello, ${auth.auth.name} (${auth.auth.email})`)}
      </div>

      {clicked ? text : <button onClick={onClick}>Click me</button>}
    </div>
  )
}
