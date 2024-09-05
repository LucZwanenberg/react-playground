import { useState } from "react"
import UserGreeting from "./UserGreeting";

export default function Fetch({ text }: { text: string }) {
  const [clicked, setClicked] = useState(false);
  const onClick = () => setClicked(true);

  return (
    <div role="heading">
      <UserGreeting />
      {clicked ? text : <button onClick={onClick}>Click me</button>}
    </div>
  )
}
