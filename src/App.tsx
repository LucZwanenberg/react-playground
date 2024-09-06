import { Provider } from 'react-redux'
import './App.css'
import Fetch from './components/Fetch/HiddenText'
import defaultStore from './redux/defaultStore'
import UserGreeting from './components/Fetch/UserGreeting'

function App() {
  return (
    <Provider store={defaultStore}>
      <UserGreeting />
      <Fetch text="Hello World!" />
    </Provider>
  )
}

export default App
