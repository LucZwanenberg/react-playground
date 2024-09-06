import { useState } from "react"

const HiddenText = ({ text }: { text: string }) => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => setClicked(true);

  return (
    <div role="heading">
      {clicked ? text : <button onClick={onClick}>Click me</button>}
    </div>
  )
}

export default HiddenText;
