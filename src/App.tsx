import { Provider } from 'react-redux'
import './App.css'
import Fetch from './components/Fetch/Fetch'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Fetch text="Hello World!" />
    </Provider>
  )
}

export default App
