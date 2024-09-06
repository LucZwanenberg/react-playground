import { Provider } from 'react-redux'
import './App.css'
import Fetch from './components/Fetch/Fetch'
import defaultStore from './redux/defaultStore'

function App() {
  return (
    <Provider store={defaultStore}>
      <Fetch text="Hello World!" />
    </Provider>
  )
}

export default App
