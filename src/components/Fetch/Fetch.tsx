import { useState, useReducer } from 'react'

const initialState = {
  error: null,
  greeting: null,
}

type ActionSuccess = {
  type: "SUCCESS";
  greeting: string;
}

type ActionError = {
  type: "ERROR";
  error: string;
}

type Action = ActionSuccess | ActionError;

type State = {
  error: string | null;
  greeting: string | null;
}

function greetingReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      }
    }
    default: {
      return state
    }
  }
}

export default function Fetch({ url }: { url: string }) {
  const [{ error, greeting }, dispatch] = useReducer(
    greetingReducer,
    initialState,
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async (url: string) =>
    fetch(url)
      .then(response => response.ok
        ? response.json()
        : (() => { throw new Error('Network response was not ok'); })())
      .then((response: any) => {
        const { data } = response;
        const { greeting } = data;
        dispatch({ type: "SUCCESS", greeting });
        setButtonClicked(true);
      })
      .catch(error => {
        dispatch({ type: "ERROR", error });
      });

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  )
}
