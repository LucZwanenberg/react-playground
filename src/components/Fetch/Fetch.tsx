import { useState } from "react"

export default function Fetch({ text }: { text: string }) {
  const [clicked, setClicked] = useState(false);
  const onClick = () => setClicked(true);

  return (
    <div role="heading">
      {clicked ? text : <button onClick={onClick}>Click me</button>}
    </div>
  )
}
