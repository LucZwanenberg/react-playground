import './App.css'
import Fetch from './components/Fetch/Fetch'
import { getUserFromApi } from './hooks/getUserFromApi'
import { AuthProvider } from './hooks/useAuth'

function App() {

  return (
    <AuthProvider getUser={getUserFromApi}>
      <Fetch text="Hello World!" />
    </AuthProvider>
  )
}

export default App
