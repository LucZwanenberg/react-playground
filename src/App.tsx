import './App.css'
import Fetch from './components/Fetch/Fetch'
import { AuthProvider } from './hooks/useAuth'

function App() {

  return (
    <AuthProvider>
      <Fetch text="Hello World!" />
    </AuthProvider>
  )
}

export default App
